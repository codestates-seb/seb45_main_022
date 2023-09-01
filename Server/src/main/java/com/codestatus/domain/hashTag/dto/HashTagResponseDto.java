package com.codestatus.domain.hashTag.dto;


import com.codestatus.domain.hashTag.entity.FeedHashTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class HashTagResponseDto {

    private long hashTagId;

    private String body;


}
