package com.codestatus.domain.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String uploadFeedImage(MultipartFile image);
}
