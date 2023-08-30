package com.codestatus.global.auth.filter;

import com.codestatus.global.auth.dto.PrincipalDto;
import com.codestatus.global.auth.jwt.JwtTokenizer;
import com.codestatus.global.auth.userdetails.UsersDetailService;
import com.codestatus.global.auth.utils.CustomAuthorityUtils;
import com.codestatus.global.auth.utils.JwtResponseUtil;
import com.codestatus.domain.user.entity.User;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UsersDetailService userService;
    private final JwtResponseUtil jwtResponseUtil;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, UsersDetailService userService, JwtResponseUtil jwtResponseUtil) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.userService = userService;
        this.jwtResponseUtil = jwtResponseUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyAccessJWS(request);
            setAuthenticationToContext(claims);

        } catch (SignatureException e) {
            request.setAttribute("exception", e);
        } catch (ExpiredJwtException e) {
            try {
                String email = verifyRefreshJWS(request);
                User user = userService.loadUserByEmail(email);
                jwtResponseUtil.setAccessToken(user, response);
                request.setAttribute("exception", new JwtException("Access token has expired"));
            } catch (ExpiredJwtException refreshEx) {
                request.setAttribute("exception", new JwtException("Refresh token has expired"));
            }
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

    private Map<String, Object> verifyAccessJWS(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ","");
        return jwtTokenizer.getClaimsFromJws(jws).getBody();
    }

    private String verifyRefreshJWS(HttpServletRequest request) {
        String jws = "";
        for(Cookie cookie:request.getCookies()) {
            if(cookie.getName().equals("Refresh")){
                jws = cookie.getValue();
                break;
            }
        }
        return jwtTokenizer.getClaimsFromJws(jws).getBody().getSubject();
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
