package com.codestatus.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@AllArgsConstructor
public class CommnetPatchDto {
    private Long id;

    @NotBlank
    @Size(max = 255, message = "댓글 글자수 초과")
    private String body;
}
