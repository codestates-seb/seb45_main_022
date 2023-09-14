package com.codestatus.global.auth.utils;

import com.codestatus.global.auth.jwt.JwtTokenizer;
import com.codestatus.domain.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@RequiredArgsConstructor
@Component
public class JwtResponseUtil {
    private final JwtTokenizer jwtTokenizer;

    public void setAccessToken(User user, HttpServletResponse response) throws IOException {
        String responseTokenString = getResponseTokenString(user);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(Collections.singletonMap("token", responseTokenString));

        response.setContentType("application/json");
        response.getWriter().write(jsonResponse);
    }
    public void setRefreshToken(User user, HttpServletResponse response) {
        String refreshToken = jwtTokenizer.generateRefreshToken(user);
        Cookie cookie = new Cookie("Refresh", refreshToken);
        response.addCookie(cookie);
    }

    public String getResponseTokenString(User user) {
        return "Bearer " + jwtTokenizer.generateAccessToken(user);
    }
}
