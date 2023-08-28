package com.codestatus.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusResponse {
    private String statName;
    private int statLevel;
    private int statExp;
}