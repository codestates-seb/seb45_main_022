package com.codestatus.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentPostDto {
    @NotBlank
    @Size(max = 255, message = "댓글 글자수 초과")
    private String body;
}
