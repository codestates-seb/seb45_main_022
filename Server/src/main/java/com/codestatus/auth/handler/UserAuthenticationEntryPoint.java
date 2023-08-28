package com.codestatus.auth.handler;

import com.codestatus.auth.utils.ErrorResponseSender;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        Exception exception = (Exception) request.getAttribute("exception");

        //Access 토큰 만료시 메세지 커스텀
        if (exception instanceof ExpiredJwtException || exception instanceof SignatureException)
            ErrorResponseSender.sendResponse(response, HttpStatus.UNAUTHORIZED, "JWT Expired");
        else
            ErrorResponseSender.sendResponse(response, HttpStatus.UNAUTHORIZED, "권한이 없습니다.");
    }
}
