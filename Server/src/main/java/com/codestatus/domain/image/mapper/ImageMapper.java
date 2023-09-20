package com.codestatus.domain.image.mapper;

import com.codestatus.domain.image.dto.ImageResponseDto;
import org.springframework.stereotype.Component;

@Component
public class ImageMapper {
    // entity -> dto
    public ImageResponseDto ImageUrlToResponseDto(String image) {
        ImageResponseDto imageResponseDto = new ImageResponseDto();
        imageResponseDto.setImageURL(image);
        return imageResponseDto;
    }
}
