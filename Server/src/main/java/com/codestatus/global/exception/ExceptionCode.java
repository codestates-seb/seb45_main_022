package com.codestatus.global.exception;

import com.codestatus.domain.user.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ExceptionCode {
    INVALID_INPUT_VALUE(400, "유효성 검증에 실패했습니다.", "V000"),

    USER_NOT_FOUND(404, "유저를 찾을 수 없습니다.", "U000"),
    USER_IS_DELETED(400, "탈퇴한 유저입니다.", "U001"),
    USER_IS_BANNED(400, "이용이 정지된 유저입니다.", "U002"),
    USER_ALREADY_CHECKED_ATTENDANCE(400, "오늘은 출석체크를 하셨습니다.", "A003"),
    USER_SAME_PASSWORD(400, "현재 비밀번호와 같은 비밀번호는 사용할 수 없습니다.", "U004"),
    USER_EXISTS_EMAIL(409, "사용중인 이메일 입니다.", "U005"),
    USER_EXISTS_NICKNAME(409, "사용중인 닉네임 입니다.", "U006"),
    NOT_RESOURCE_OWNER(400, "리소스의 소유자가 아닙니다.", "U007"),
    FORBIDDEN_REQUEST(403, "해당 리소스에 접근이 불가능합니다.", "U008"),
    INVALID_USER(401, "유효하지 않은 유저입니다.", "U009"),

    FEED_NOT_FOUND(404, "피드를 찾을 수 없습니다.", "F000"),
    FEED_NOT_EDITABLE(400, "피드를 수정할 수 없습니다.", "F001"),

    IMAGE_URL_ERROR(404, "이미지 URL을 찾을 수 없습니다.", "I000"),
    INVALID_FILE_TYPE(400, "이미지 파일만 업로드 가능합니다.", "I001"),

    FILE_NOT_FOUND(404, "파일을 찾을 수 없습니다.", "f000"),
    FILE_TOO_LARGE(400, "파일 크기는 5MB를 넘을 수 없습니다.", "f001"),

    HASHTAG_NOT_FOUND(404, "해시태그를 찾을 수 없습니다.", "H000"),

    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없습니다.", "C000"),

    STAT_NOT_FOUND(404, "스탯을 찾을 수 없습니다.", "S000"),

    LIKE_BAD_REQUEST(400, "자신의 게시물은 좋아요를 할 수 없습니다.", "L000"),

    DUPLICATE_REPORT_EXCEPTION(400, "신고는 한 번만 가능합니다.", "R000"),

    INVALID_PATH_VALUE(400, "유효하지 않은 값입니다.", "P000");

//    NOT_IMPLEMENTATION(501, "해당 기능은 구현되지 않았습니다.");

    private final int status;
    private final String message;
    private final String errorCode;

    public static ExceptionCode of(User.UserStatus userStatus){
        if (userStatus.equals(User.UserStatus.USER_DELETE)) return ExceptionCode.USER_IS_DELETED;
        else return ExceptionCode.USER_IS_BANNED;
    }
}
