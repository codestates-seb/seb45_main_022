package com.codestatus.domain.status.dto;

import com.codestatus.domain.category.dto.CategoryResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class StatResponseDto {
    private long statCode;

    private String statName;

    private List<CategoryResponseDto> categories;
}
