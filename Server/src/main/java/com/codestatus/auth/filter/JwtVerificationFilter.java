package com.codestatus.auth.filter;

import com.codestatus.auth.dto.PrincipalDto;
import com.codestatus.auth.jwt.JwtTokenizer;
import com.codestatus.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyJWS(request);
            setAuthenticationToContext(claims);

        } catch (SignatureException e) {
            request.setAttribute("exception", e);
        } catch (ExpiredJwtException e) {
            request.setAttribute("exception", e);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJWS(HttpServletRequest request) {

        String jws = request.getHeader("Authorization").replace("Bearer ","");

        String key = jwtTokenizer.getSecretKey();
        String encodedKey = jwtTokenizer.encodeBase64SecretKey(key);

        Jws<Claims> claimsJws = jwtTokenizer.getClaimsFromJws(jws,encodedKey);
        Map<String, Object> claims = claimsJws.getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {

        String email = (String) claims.get("username");
        Integer id = (Integer) claims.get("id");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List<String>) claims.get("roles"));

        PrincipalDto principal = new PrincipalDto(id,email);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null, authorities );

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
