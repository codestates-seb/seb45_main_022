package com.codestatus.domain.feed.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FeedPostDto {

    @NotBlank
    private String body;

    private String data;

    private List<String> hashTag;
}
