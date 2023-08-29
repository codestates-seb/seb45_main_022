package com.codestatus.hashtag.dto;


import com.codestatus.feed.entity.FeedHashTag;
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
