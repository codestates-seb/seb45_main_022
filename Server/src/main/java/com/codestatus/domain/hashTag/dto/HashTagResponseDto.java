package com.codestatus.domain.hashTag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class HashTagResponseDto {

    private long hashTagId;

    private String body;


}
