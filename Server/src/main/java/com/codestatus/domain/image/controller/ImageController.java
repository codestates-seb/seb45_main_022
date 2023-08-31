package com.codestatus.domain.image.controller;

import com.codestatus.domain.image.dto.ImageResponseDto;
import com.codestatus.domain.image.mapper.ImageMapper;
import com.codestatus.domain.image.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
public class ImageController {
    private final ImageService service;
    private final ImageMapper mapper;

    public ImageController(ImageService service, ImageMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping("/upload")
    public ResponseEntity uploadFeedImage(@RequestParam("image") MultipartFile image) {
        ImageResponseDto url = mapper.ImageUrlToResponseDto(service.uploadFeedImage(image));
        return ResponseEntity.ok().body(url);
    }
}
