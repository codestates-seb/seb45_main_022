package com.codestatus.domain.attendance.service;

import com.codestatus.domain.attendance.entity.Attendance;
import com.codestatus.domain.attendance.repository.AttendanceRepository;
import com.codestatus.domain.user.command.LevelCommand;
import com.codestatus.domain.user.command.UserCommand;
import com.codestatus.domain.user.entity.User;
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
    private final AttendanceRepository attendanceRepository;
    private final LevelCommand levelCommand;
    private final UserCommand userCommand;

    public void checkAttendance(Attendance attendance) {
        User user = userCommand.findVerifiedUser(attendance.getUserId()); // 유저 검색(유저가 없거나, DELETE 상태인 유저인 경우 예외)

        try {
            attendanceRepository.save(attendance); // attendance 테이블에 user_id, stat_id 저장 try
        } catch (DataIntegrityViolationException e) { // 테이블에 user_id(unique)가 이미 존재 한다면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_ALREADY_CHECKED_ATTENDANCE);
        }
        levelCommand.gainExp(user, attendanceExp, attendance.getStatId());

        userRepository.save(user); // 유저 정보 저장
    }

    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Seoul") // cron = "0 0 0 * * ?", zone = "Asia/Seoul" <- 매일 자정마다 실행
    public void cleanAttendanceTable() { // 다음날 출석체크를 위해 attendance 테이블 비우기
        attendanceRepository.deleteAll();
    }
}



