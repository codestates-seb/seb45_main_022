package com.codestatus.domain.feed.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FeedPostDto {

    @NotBlank
    @Size(max = 1024, message = "본문 글자수 초과")
    private String body;

    private String data;

    private List<String> hashTag;
}
