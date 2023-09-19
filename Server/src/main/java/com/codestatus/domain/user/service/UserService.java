package com.codestatus.domain.user.service;

import com.codestatus.domain.user.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    void createEntity(User user);
    User findEntity(long userId);
    void updateUserNickname(User user, long loginUserId);
    void updatePassword(User user, long loginUserId);
    void deleteEntity(long loginUserId);
    void uploadProfileImage(MultipartFile imageFile, long loginUserId);
    void resetProfileImage(long loginUserId);
}
