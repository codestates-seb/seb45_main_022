package com.codestatus.domain.hashTag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class HashTagResponseDto {

    private long hashTagId;

    private int count;

    private String body;


}
