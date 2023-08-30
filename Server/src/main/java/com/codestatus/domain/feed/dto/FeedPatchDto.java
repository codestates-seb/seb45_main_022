package com.codestatus.domain.feed.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FeedPatchDto {

    private long id;

    private String body;
}
