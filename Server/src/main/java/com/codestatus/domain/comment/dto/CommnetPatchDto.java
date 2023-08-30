package com.codestatus.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class CommnetPatchDto {
    private Long id;
    @NotBlank
    private String body;
}
