package com.codestatus.domain.hashtag.dto;


import com.codestatus.domain.feed.entity.FeedHashTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class HashtagResponseDto {

    private long hashTagId;

    private String body;

    private List<FeedHashTag> feedHashTags;


}
