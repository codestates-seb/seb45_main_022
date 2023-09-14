package com.codestatus.global.exception;

import io.jsonwebtoken.JwtException;
import lombok.Getter;

@Getter
public class AccessTokenExpiredException extends JwtException {
    public AccessTokenExpiredException() {
        super("Access token has expired");
    }
}
