package com.codestatus.auth.handler;

import com.codestatus.auth.utils.ErrorResponseSender;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class MemberAccessDeniedHandler implements AccessDeniedHandler {
    @Override //접근 거부시 처리할 핸들러
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

        ErrorResponseSender.sendResponse(response, HttpStatus.FORBIDDEN);
        String errorMessage = accessDeniedException.getMessage();
    }
}

