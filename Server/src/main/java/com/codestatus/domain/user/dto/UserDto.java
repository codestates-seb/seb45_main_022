package com.codestatus.domain.user.dto;

import com.codestatus.domain.status.dto.StatusResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

public class UserDto {
    @Getter
    public static class signup {
        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        @Pattern(regexp = "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
                message = "이메일 형식이 올바르지 않습니다.")
        private String email;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$",
                message = "비밀번호는 특수문자, 영문자, 숫자를 포함한 8글자 이상 16글자 이하로 구성되어야 합니다.")
        private String password;

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
        @Pattern(regexp = "^[가-힣a-zA-Z]{2,6}$",
                message = "닉네임은 한글, 영문자만 허용되며 2글자 이상 6글자 이하로 구성되어야 하며 공백은 허용하지 않습니다.")
        private String nickname;
    }

    @Getter
    @NoArgsConstructor
    public static class PatchNickname {

        @Pattern(regexp = "^[가-힣a-zA-Z]{2,6}$",
                message = "닉네임은 한글, 영문자만 허용되며 2글자 이상 6글자 이하로 구성되어야 하며 공백은 허용하지 않습니다.")
        private String nickname;

    }

    @Getter
    @NoArgsConstructor
    public static class PatchPassword {

        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$",
                message = "비밀번호는 특수문자, 영문자, 숫자를 포함한 8글자 이상 16글자 이하로 구성되어야 합니다.")
        private String password;

    }

    @Getter
    @Builder
    public static class Response {
        private Long id;
        private String email;
        private String nickname;
        private String profileImage;
        private List<StatusResponse> statuses;
        private String createDate;
        private String modifiedDate;
    }
}
