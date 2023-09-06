package com.codestatus.domain.attendance.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttendanceDto {
    private int statId;
    private Long userId;
}
