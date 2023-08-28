package com.codestatus.auth.filter;

import com.codestatus.auth.dto.LoginDto;
import com.codestatus.auth.jwt.JwtTokenizer;
import com.codestatus.exception.BusinessLogicException;
import com.codestatus.exception.ExceptionCode;
import com.codestatus.user.entity.User;
import com.codestatus.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
        this.userRepository = userRepository;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto;
        try {
            loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = (User) authResult.getPrincipal();

        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);

        String responseTokenString = "Bearer " + accessToken;
//         response.setHeader("Authorization", responseTokenString );
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(Collections.singletonMap("token", responseTokenString));

        response.setContentType("application/json");
        response.getWriter().write(jsonResponse);

        Cookie cookie = new Cookie("Refresh", refreshToken);
        response.addCookie(cookie);

    }

    private String delegateAccessToken(User user){

        Map<String, Object> claims = new HashMap<>();

        claims.put("username", user.getEmail());
        claims.put("id", user.getUserId());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();

        int expirationMinutes = jwtTokenizer.getAccessTokenExpirationMinutes();
        Date expiration = jwtTokenizer.getTokenExpiration(expirationMinutes);

        String plainKey = jwtTokenizer.getSecretKey();
        String base64EncodedKey = jwtTokenizer.encodeBase64SecretKey(plainKey);

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedKey);

        return accessToken;
    }

    String delegateRefreshToken(User user){

        String subject = user.getEmail();
        int expirationMinutes = jwtTokenizer.getRefreshTokenExpirationMinutes();
        Date expiration = jwtTokenizer.getTokenExpiration(expirationMinutes);

        String plainKey = jwtTokenizer.getSecretKey();
        String base64EncodedKey = jwtTokenizer.encodeBase64SecretKey(plainKey);

        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedKey);
        return refreshToken;
    }
}
