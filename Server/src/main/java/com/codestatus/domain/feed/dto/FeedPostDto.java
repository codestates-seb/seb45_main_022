package com.codestatus.domain.feed.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class FeedPostDto {

    private long id;

    @NotBlank
    private String body;

}
