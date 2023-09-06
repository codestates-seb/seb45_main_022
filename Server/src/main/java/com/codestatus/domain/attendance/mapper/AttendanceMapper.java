package com.codestatus.domain.attendance.mapper;

import com.codestatus.domain.attendance.dto.AttendanceDto;
import com.codestatus.domain.attendance.entity.Attendance;
import org.springframework.stereotype.Component;

@Component
public class AttendanceMapper {
    public Attendance dtoToEntity(AttendanceDto attendanceDto) {
        Attendance attendance = new Attendance();
        attendance.setUserId(attendanceDto.getUserId());
        attendance.setStatId(attendanceDto.getStatId());
        return attendance;
    }
}
