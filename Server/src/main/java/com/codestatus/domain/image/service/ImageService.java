package com.codestatus.domain.image.service;

import com.codestatus.global.aws.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {
    private final FileStorageService fileStorageService;

    public ImageService(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    public String uploadFeedImage(MultipartFile image) {
        return fileStorageService.storeFile(image); // 파일 URL 반환
    }
}
