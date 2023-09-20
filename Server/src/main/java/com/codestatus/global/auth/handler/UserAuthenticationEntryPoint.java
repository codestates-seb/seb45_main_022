package com.codestatus.global.auth.handler;

import com.codestatus.global.auth.utils.ErrorResponseSender;
import com.codestatus.global.exception.AccessTokenExpiredException;
import com.codestatus.global.exception.RefreshTokenExpiredException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.jwt.BadJwtException;
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
//        //Access 토큰 만료시 메세지 커스텀
        if (exception instanceof AccessTokenExpiredException) {
            String token = String.valueOf(request.getAttribute("token"));
            ErrorResponseSender.sendResponse(response, HttpStatus.UNAUTHORIZED, exception.getMessage(), token);
        }
        else if (exception instanceof RefreshTokenExpiredException || exception instanceof SignatureException || exception instanceof BadJwtException){
            ErrorResponseSender.sendResponse(response, HttpStatus.UNAUTHORIZED, exception.getMessage());
        }

        else ErrorResponseSender.sendResponse(response, HttpStatus.UNAUTHORIZED, authException.getMessage());
    }
}
