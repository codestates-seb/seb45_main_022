package com.codestatus.global.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class FileStorageService {
    private final String bucketName = "codestatus";

    @Autowired
    private AmazonS3 amazonS3;

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    private static final Set<String> imageTypes = new HashSet<>(Arrays.asList(
            "image/jpeg","image/jpg","image/png"));

    public String storeFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND);
        }

        if (!imageTypes.contains(file.getContentType())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_FILE_TYPE);
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new BusinessLogicException(ExceptionCode.FILE_TOO_LARGE);
        }

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        fileName = System.currentTimeMillis() + "_" + fileName;

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");

            amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_URL_ERROR);
        }

        String fileUrl = amazonS3.getUrl(bucketName, fileName).toString();

        return fileUrl;
    }

    public void deleteFile(String url) {
        String splitStr = ".com/";
        String fileName = url.substring(url.lastIndexOf(splitStr) + splitStr.length());

        amazonS3.deleteObject(new DeleteObjectRequest(bucketName, fileName));
    }
}
