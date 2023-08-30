package com.codestatus.global.auth.utils;

import com.codestatus.global.auth.jwt.JwtTokenizer;
import com.codestatus.domain.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtResponseUtil {
    private final JwtTokenizer jwtTokenizer;

    public JwtResponseUtil(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }
    public void setAccessToken(User user, HttpServletResponse response) throws IOException {
        String accessToken = jwtTokenizer.generateAccessToken(user);

        String responseTokenString = "Bearer " + accessToken;
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
}
