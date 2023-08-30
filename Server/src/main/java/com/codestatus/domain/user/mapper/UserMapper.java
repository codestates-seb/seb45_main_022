package com.codestatus.domain.user.mapper;

import com.codestatus.domain.status.entity.Stat;
import com.codestatus.domain.status.entity.Status;
import com.codestatus.domain.user.dto.StatusResponse;
import com.codestatus.domain.user.dto.UserDto;
import com.codestatus.domain.user.entity.User;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class UserMapper {
    public User userIdToUser(Long userId){
        User user = new User();
        user.setUserId(userId);
        return user;
    }
    //Dto -> Entity
    public User userPostToUser(UserDto.signup requestBody) {
        User user = new User();
        user.setEmail(requestBody.getEmail());
        user.setPassword(requestBody.getPassword());
        user.setNickName(requestBody.getNickName());
        return user;
    }

    // Dto -> Entity
    public User userPatchToUser(UserDto.PatchNickName requestBody) {
        User user = new User();
        user.setUserId(requestBody.getId());
        user.setNickName(requestBody.getNickName());
        return user;
    }

    // Dto -> Entity
    public User userPatchPasswordToUser(UserDto.PatchPassword requestBody) {
        User user = new User();
        user.setUserId(requestBody.getId());
        user.setPassword(requestBody.getPassword());
        return user;
    }

    // Entity -> Dto
    public UserDto.Response userToUserResponse(User user) {
        List<StatusResponse> statusResponses = new ArrayList<>();

        for (Status status : user.getStatuses()) {
            StatusResponse statusResponse = new StatusResponse();

            Stat stat = status.getStat();
            if (stat != null) {
                statusResponse.setStatName(stat.getStatName());
            }

            statusResponse.setStatLevel(status.getStatLevel());
            statusResponse.setStatExp(status.getStatExp());

            statusResponses.add(statusResponse);
        }

        return UserDto.Response.builder()
                .id(user.getUserId())
                .email(user.getEmail())
                .nickName(user.getNickName())
                .profileImage(user.getProfileImage())
                .attendance(user.isAttendance())
                .statuses(statusResponses)
                .createDate(String.valueOf(user.getCreatedAt()))
                .modifiedDate(String.valueOf(user.getModifiedAt()))
                .build();
    }
}