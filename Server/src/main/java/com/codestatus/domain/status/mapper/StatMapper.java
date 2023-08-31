package com.codestatus.domain.status.mapper;

import com.codestatus.domain.category.dto.CategoryResponseDto;
import com.codestatus.domain.status.dto.StatResponseDto;
import com.codestatus.domain.status.entity.Stat;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class StatMapper {
    public StatResponseDto statToStatResponseDto(Stat stat){
        return StatResponseDto.builder()
                .statCode(stat.getStatId())
                .statName(stat.getStatName())
                .categories(stat.getCategories().stream()
                        .map(category -> CategoryResponseDto.builder()
                                .categoryCode(category.getCategoryId())
                                .categoryName(category.getCategory())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
