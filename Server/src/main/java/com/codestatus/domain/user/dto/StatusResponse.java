package com.codestatus.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusResponse {
    private int statId;
    private int statLevel;
    private int statExp;
    private int requiredExp;
}