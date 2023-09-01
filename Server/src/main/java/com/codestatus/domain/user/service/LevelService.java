package com.codestatus.domain.user.service;

import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.repository.ExpTableRepository;
import com.codestatus.domain.user.repository.UserRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class LevelService {
    @Value("${exp.attendance-exp}")
    private int attendanceExp;
    private final UserRepository userRepository;
    private final ExpTableRepository expTableRepository;
    private final UserService userService;

    public LevelService(UserRepository userRepository, ExpTableRepository expTableRepository, UserService userService) {
        this.userRepository = userRepository;
        this.expTableRepository = expTableRepository;
        this.userService = userService;
    }
    // 출석체크
    public void checkAttendance(int chosenStat, long loginId) { // chosenStat: 0(str), 1(dex), 2(int), 3(charm), 4(vitality)
        User findUser = userService.findVerifiedUser(loginId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)

        if(findUser.isAttendance()) { // 이미 출석체크를 했다면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_ALREADY_CHECKED_ATTENDANCE);
        }

        findUser.getStatuses().get(chosenStat).setStatExp(findUser.getStatuses().get(chosenStat).getStatExp() + attendanceExp); // 선택한 stat 경험치 증가
        levelUpCheck(findUser, chosenStat); // 레벨업 체크
        findUser.setAttendance(true); // 출석체크 상태를 true로 변경
        userRepository.save(findUser);
    }

    public void gainExp(User user, int exp, int statId) {
        user.getStatuses().get(statId-1).setStatExp(
                user.getStatuses().get(statId-1).getStatExp() + exp
        );
        levelUpCheck(user, statId-1);
    }

    /*
    만약 출석체크 상태를 변경해야 할 유저가 많아진다면
    서버에 부담이 되지 않을까?
     */

    // 유저 상태가 USER_ACTIVE인 유저와 출석체크 상태가 true인 유저만 변경(매일 자정마다 실행)
    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Seoul") // cron = "0 0 0 * * ?", zone = "Asia/Seoul" <- 매일 자정마다 실행
    public void updateAttendance() {
        List<User> users = userRepository.findAllByUserStatusAndAttendance(User.UserStatus.USER_ACTIVE, true); // 유저 상태가 USER_ACTIVE인 유저와 출석체크 상태가 true인 유저만 조회
        for (User user : users) { // 출석체크 상태를 false로 변경
            user.setAttendance(false);
        }
        userRepository.saveAll(users);
    }

    private void levelUpCheck(User user, int chooseStat) { // chooseStat: 0(str), 1(dex), 2(int), 3(charm), 4(vitality)
        int currentLevel = user.getStatuses().get(chooseStat).getStatLevel(); // 현재 레벨
        int currentExp = user.getStatuses().get(chooseStat).getStatExp(); // 현재 경험치
        int requiredExp = expTableRepository.findById((long) currentLevel).get().getRequired(); // 필요 경험치
        int maxLevel = 100; // 최대 레벨

        if (currentLevel >= maxLevel) { // 현재 레벨이 최대 레벨이라면 레벨업 불가
            return;
        }

        if (currentExp >= requiredExp) { // 현재 경험치가 필요 경험치보다 많다면 레벨업
            currentLevel += 1; // 레벨업
            user.getStatuses().get(chooseStat).setStatLevel(currentLevel); // 레벨 저장
            currentExp -= requiredExp; // 현재 경험치에서 필요 경험치 차감
            user.getStatuses().get(chooseStat).setStatExp(currentExp); // 경험치 차감
        }

        // 현재 레벨에서 다음 레벨까지 필요한 경험치 = 다음 레벨까지 필요한 경험치 - 현재 레벨까지 필요한 경험치 (백분률로 저장)
        int nextLevelRequiredExp = expTableRepository.findById((long) (currentLevel)).get().getRequired() - currentExp;
        user.getStatuses().get(chooseStat).setRequiredExp(nextLevelRequiredExp); // 다음 레벨까지 필요한 경험치 저장

        userRepository.save(user); // 유저 정보 저장
    }
}
