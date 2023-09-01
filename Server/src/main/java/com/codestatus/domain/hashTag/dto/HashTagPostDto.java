package com.codestatus.domain.hashTag.dto;

import javax.validation.constraints.NotBlank;

public class HashTagPostDto {

    @NotBlank
    private String body;
}
