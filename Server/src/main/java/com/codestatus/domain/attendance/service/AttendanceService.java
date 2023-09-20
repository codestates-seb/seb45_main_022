package com.codestatus.domain.attendance.service;

import com.codestatus.domain.attendance.entity.Attendance;

public interface AttendanceService {
    void checkAttendance(Attendance attendance);
    boolean isAlreadyCheckedAttendance(long userId);
}
