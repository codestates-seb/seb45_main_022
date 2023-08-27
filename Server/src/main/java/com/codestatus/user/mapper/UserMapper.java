package com.codestatus.user.mapper;

import com.codestatus.status.Stat;
import com.codestatus.status.Status;
import com.codestatus.user.dto.StatusResponse;
import com.codestatus.user.dto.UserDto;
import com.codestatus.user.entity.User;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class UserMapper {
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
                .statuses(statusResponses)
                .createDate(String.valueOf(user.getCreatedAt()))
                .modifiedDate(String.valueOf(user.getModifiedAt()))
                .build();
    }

    // 출석체크 2안 response
    public StatusResponse statusToStatusResponse(Status status) {
        StatusResponse statusResponse = new StatusResponse();
        statusResponse.setStatName(status.getStat().getStatName());
        statusResponse.setStatLevel(status.getStatLevel());
        statusResponse.setStatExp(status.getStatExp());
        return statusResponse;
    }
}
