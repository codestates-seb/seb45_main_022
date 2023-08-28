package com.codestatus.auth.handler;

import com.codestatus.auth.jwt.JwtTokenizer;
import com.codestatus.auth.userdetails.UsersDetailService;
import com.codestatus.auth.utils.CustomAuthorityUtils;
import com.codestatus.user.entity.User;
import com.codestatus.user.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final UsersDetailService userService;

    public OAuth2UserSuccessHandler(JwtTokenizer jwtTokenizer,
                                    UsersDetailService userService) {
        this.jwtTokenizer = jwtTokenizer;
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String path = "";
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        try {
            User user = userService.loadUserByEmail(email);
            queryParams.add("access_token", jwtTokenizer.generateAccessToken(user));
            queryParams.add("refresh_token", jwtTokenizer.generateRefreshToken(user));
        } catch (UsernameNotFoundException e){
            path = "/oauth";
        }
        String uri = createURI(queryParams, path).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(MultiValueMap<String, String> queryParams, String path) {
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
//                .port(80)
                .path(path)
                .queryParams(queryParams)
                .build()
                .toUri();
    }

}
