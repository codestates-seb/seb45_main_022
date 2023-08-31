package com.codestatus.global.exception;

public enum ExceptionCode {
    INVALID_INPUT_VALUE(400, "유효성 검증에 실패했습니다."),
    USER_NOT_FOUND(404, "유저를 찾을 수 없습니다."),
    USER_IS_DELETED(400, "탈퇴한 유저입니다."),
    USER_IS_BANNED(400, "이용이 정지된 유저입니다."),
    USER_ALREADY_CHECKED_ATTENDANCE(400, "오늘은 출석체크를 하셨습니다."),
    USER_SAME_PASSWORD(400, "현재 비밀번호와 같은 비밀번호는 사용할 수 없습니다."),
    USER_EXISTS_EMAIL(409, "사용중인 이메일 입니다."),
    USER_EXISTS_NICKNAME(409, "사용중인 닉네임 입니다."),
    USER_EXISTS_PHONENUM(409, "사용중인 번호 입니다."),
    NOT_RESOURCE_OWNER(400, "리소스의 소유자가 아닙니다."),
    BOARD_NOT_FOUND(404, "피드를 찾을 수 없습니다."),
    BOARD_NOT_EDITABLE(400, "피드를 수정할 수 없습니다."),
    IMAGE_URL_ERROR(404, "이미지 URL을 찾을 수 없습니다." ),
    FILE_NOT_FOUND(404, "파일을 찾을 수 없습니다."),
    INVALID_FILE_TYPE(400, "이미지 파일만 업로드 가능합니다."),
    FILE_TOO_LARGE(400, "파일 크기는 5MB를 넘을 수 없습니다."),
    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없습니다."),
    FORBIDDEN_REQUEST(403, "해당 리소스에 접근이 불가능합니다."),
    STAT_NOT_FOUND(404, "스탯을 찾을 수 없습니다.");

//    NOT_IMPLEMENTATION(501, "해당 기능은 구현되지 않았습니다.");

    private final int status;

    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
