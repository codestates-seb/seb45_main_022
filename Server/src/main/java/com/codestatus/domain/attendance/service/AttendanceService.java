package com.codestatus.domain.attendance.service;

import com.codestatus.domain.attendance.entity.Attendance;
import com.codestatus.domain.attendance.repository.AttendanceRepository;
import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.repository.ExpTableRepository;
import com.codestatus.domain.user.repository.UserRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AttendanceService {
    @Value("${exp.attendance-exp}")
    private int attendanceExp;
    private final UserRepository userRepository;
    private final ExpTableRepository expTableRepository;
    private final AttendanceRepository attendanceRepository;

    public void checkAttendance(Attendance attendance) {
        User user = findUser(attendance.getUserId()); // 유저 검색(유저가 없거나, DELETE 상태인 유저인 경우 예외)
        int chosenStat = attendance.getStatId() - 1; // chosenStat: 1(str), 2(dex), 3(int), 4(charm), 5(vitality)

        try {
            attendanceRepository.save(attendance); // attendance 테이블에 user_id, stat_id 저장 try
        } catch (DataIntegrityViolationException e) { // 테이블에 user_id(unique)가 이미 존재 한다면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_ALREADY_CHECKED_ATTENDANCE);
        }

        user.getStatuses().get(chosenStat).setStatExp(user.getStatuses().get(chosenStat).getStatExp() + attendanceExp); // 선택한 stat 경험치 증가
        levelUpCheck(user, chosenStat); // 레벨업 체크

        userRepository.save(user); // 유저 정보 저장
    }

    public User findUser(long loginId) {
        User user = userRepository.findById(loginId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        if (user.getUserStatus().equals(User.UserStatus.USER_DELETE)) {
            throw new BusinessLogicException(ExceptionCode.USER_IS_DELETED);
        }
        return user;
    }

    private void levelUpCheck(User user, int chosenStat) { // chooseStat: 1(str), 2(dex), 3(int), 4(charm), 5(vitality)
        int maxLevel = 100; // 최대 레벨
        int currentLevel = user.getStatuses().get(chosenStat).getStatLevel(); // 현재 레벨

        if (currentLevel >= maxLevel) { // 현재 레벨이 최대 레벨이라면 레벨업 불가
            return;
        }

        int currentExp = user.getStatuses().get(chosenStat).getStatExp(); // 현재 경험치
        int requiredExp = expTableRepository.findById((long) currentLevel).get().getRequired(); // 필요 경험치

        if (currentExp >= requiredExp) { // 현재 경험치가 필요 경험치보다 많다면 레벨업
            currentLevel += 1; // 레벨업
            user.getStatuses().get(chosenStat).setStatLevel(currentLevel); // 레벨 저장
            currentExp -= requiredExp; // 현재 경험치에서 필요 경험치 차감
            user.getStatuses().get(chosenStat).setStatExp(currentExp); // 경험치 차감
        }

        // 현재 레벨에서 다음 레벨까지 필요한 경험치 = 다음 레벨까지 필요한 경험치 - 현재 레벨까지 필요한 경험치
        int nextLevelRequiredExp = expTableRepository.findById((long) (currentLevel)).get().getRequired() - currentExp;
        user.getStatuses().get(chosenStat).setRequiredExp(nextLevelRequiredExp); // 다음 레벨까지 필요한 경험치 저장

        userRepository.save(user); // 유저 정보 저장
    }

    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Seoul") // cron = "0 0 0 * * ?", zone = "Asia/Seoul" <- 매일 자정마다 실행
    public void cleanAttendanceTable() { // 다음날 출석체크를 위해 attendance 테이블 비우기
        attendanceRepository.deleteAll();
    }
}



