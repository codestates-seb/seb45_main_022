package com.codestatus.global.auth.utils;

import com.codestatus.global.exception.ExceptionCode;
import com.codestatus.global.response.ErrorResponse;
import com.codestatus.global.response.JwtErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponseSender {
    public static void sendResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(ExceptionCode.FORBIDDEN_REQUEST);
        sendResponse(response,status, errorResponse);
    }

    public static void sendResponse(HttpServletResponse response, HttpStatus status, String message) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(status, message);
        sendResponse(response,status, errorResponse);
    }

    public static void sendResponse(HttpServletResponse response, HttpStatus status, String message, String token) throws IOException {
        JwtErrorResponse errorResponse = JwtErrorResponse.of(status, message, token);
        sendResponse(response, status, errorResponse);
    }
    private static void sendResponse(HttpServletResponse response, HttpStatus status, Object errorResponse) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String errorJson = mapper.writeValueAsString(errorResponse);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());

        response.getWriter().write(errorJson);
    }
}
