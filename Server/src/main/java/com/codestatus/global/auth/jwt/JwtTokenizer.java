package com.codestatus.global.auth.jwt;

import com.codestatus.domain.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenizer {

    @Getter
    @Value("${jwt.key}")// "${key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    //Generate Access Token
    public String generateAccessToken (User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getUserId());
        claims.put("email", user.getEmail());
        claims.put("roles", user.getRoles());
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setClaims(claims)
                .setExpiration(getTokenExpiration(accessTokenExpirationMinutes))
                .setIssuedAt(Calendar.getInstance().getTime())
                .signWith(getKey())
                .compact();
    }

    //Generate Refresh Token
    public String generateRefreshToken (User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setExpiration(getTokenExpiration(refreshTokenExpirationMinutes))
                .setIssuedAt(Calendar.getInstance().getTime())
                .signWith(getKey())
                .compact();

    }

    //Get key from secretKey
    public Key getKey() {
        byte [] byteKey = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(byteKey);
    }

    public void verificateJWTSignature (String jwtWithSignature, String encodedBase64SecretKey) {
        JwtParser parser = Jwts.parserBuilder().setSigningKey(getKey()).build();
        parser.parseClaimsJws(jwtWithSignature);
    }

    public Date getTokenExpiration(int minutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, minutes);

        return calendar.getTime();
    }

    public Jws<Claims> getClaimsFromJws(String jws) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build().parseClaimsJws(jws);
    }
}
