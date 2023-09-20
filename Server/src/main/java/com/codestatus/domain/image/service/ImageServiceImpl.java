package com.codestatus.domain.image.service;

import com.codestatus.global.aws.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final FileStorageService fileStorageService;

    @Override
    public String uploadFeedImage(MultipartFile image) {
        return fileStorageService.storeFile(image); // 파일 URL 반환
    }
}
