package com.codestatus.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class JwtErrorResponse {
    private int status;
    private String message;
    private final String errorCode = "T000";
    private String token;


    public static JwtErrorResponse of(HttpStatus httpStatus, String message, String token) {
        return new JwtErrorResponse(httpStatus.value(), message, token);
    }
}