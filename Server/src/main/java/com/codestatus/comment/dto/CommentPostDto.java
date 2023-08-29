package com.codestatus.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
@AllArgsConstructor
public class CommentPostDto {
    @NotEmpty
    String body;
}
