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
        user.setNickname(requestBody.getNickname());
        return user;
    }

    // Dto -> Entity
    public User userPatchToUser(UserDto.PatchNickname requestBody) {
        User user = new User();
        user.setNickname(requestBody.getNickname());
        return user;
    }

    // Dto -> Entity
    public User userPatchPasswordToUser(UserDto.PatchPassword requestBody) {
        User user = new User();
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
                statusResponse.setStatId(stat.getStatId().intValue());
            }

            statusResponse.setStatLevel(status.getStatLevel());
            statusResponse.setStatExp(status.getStatExp());
            statusResponse.setRequiredExp(status.getRequiredExp());
            statusResponses.add(statusResponse);
        }

        return UserDto.Response.builder()
                .id(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .statuses(statusResponses)
                .createDate(String.valueOf(user.getCreatedAt()))
                .modifiedDate(String.valueOf(user.getModifiedAt()))
                .build();
    }
}
