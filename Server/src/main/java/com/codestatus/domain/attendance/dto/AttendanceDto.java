package com.codestatus.domain.attendance.dto;

import lombok.Builder;
import lombok.Getter;

public class AttendanceDto {
    @Getter
    @Builder
    public static class Post {
        private Long userId;
        private int statId;
    }

    @Getter
    @Builder
    public static class Response {
        private boolean isAttendance;
    }
}