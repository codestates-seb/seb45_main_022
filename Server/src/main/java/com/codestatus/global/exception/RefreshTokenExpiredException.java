package com.codestatus.global.exception;

import io.jsonwebtoken.JwtException;

public class RefreshTokenExpiredException extends JwtException {
    public RefreshTokenExpiredException() {
        super("Refresh token has expired");
    }
}
