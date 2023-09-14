package com.codestatus.domain.feed.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
public class FeedPatchDto {

    private long id;

    @Size(max = 1024, message = "본문 글자수 초과")
    private String body;
    private String data;
}
