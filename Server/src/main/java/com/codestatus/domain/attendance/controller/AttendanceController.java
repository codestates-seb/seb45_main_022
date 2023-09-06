package com.codestatus.domain.attendance.controller;

import com.codestatus.domain.attendance.dto.AttendanceDto;
import com.codestatus.domain.attendance.entity.Attendance;
import com.codestatus.domain.attendance.mapper.AttendanceMapper;
import com.codestatus.domain.attendance.service.AttendanceService;
import com.codestatus.global.auth.dto.PrincipalDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/attendance")
public class AttendanceController {
    private final AttendanceService attendanceService;
    private final AttendanceMapper attendanceMapper;

    // 출석체크 컨트롤러
    @PostMapping("/{chosenStat}")
    public ResponseEntity checkAttendance(@PathVariable @Min(1) @Max(5) int chosenStat,
                                          @AuthenticationPrincipal PrincipalDto principal) {
        AttendanceDto attendanceDto = AttendanceDto.builder()
                .statId(chosenStat)
                .userId(principal.getId())
                .build();
        Attendance attendance = attendanceMapper.dtoToEntity(attendanceDto);
        attendanceService.checkAttendance(attendance); // 출석체크 메서드 호출
        return ResponseEntity.status(HttpStatus.OK).body("attendance check success"); // 출석체크 성공 메시지 반환
    }
}
