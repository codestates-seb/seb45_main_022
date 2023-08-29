package com.codestatus.feed.dto;


import com.codestatus.feed.entity.Category;
import com.codestatus.hashtag.entity.HashTag;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class FeedPostDto {

    @NotBlank
    private long id;

    @NotBlank
    private String body;

    @NotBlank
    private Category category;

    private HashTag hashTag;


}
