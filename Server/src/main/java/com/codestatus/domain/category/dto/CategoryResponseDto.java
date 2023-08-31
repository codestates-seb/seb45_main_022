package com.codestatus.domain.category.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CategoryResponseDto {
    private long categoryCode;

    private String categoryName;
}
