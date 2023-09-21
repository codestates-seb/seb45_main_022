package com.codestatus.global.auth.handler;

import com.codestatus.domain.user.service.UserService;
import com.codestatus.global.auth.jwt.JwtTokenizer;
import com.codestatus.global.auth.userdetails.UsersDetailService;
import com.codestatus.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
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
import java.util.Map;

@RequiredArgsConstructor
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final UsersDetailService usersDetailService;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();

        String email = getEmail(oAuth2User);
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        User user;
        try {
            user = usersDetailService.loadUserByEmail(email);

        } catch (UsernameNotFoundException e){
           user = userService.createOauthUser(email);
        }

        queryParams.add("access_token", jwtTokenizer.generateAccessToken(user));
        queryParams.add("refresh_token", jwtTokenizer.generateRefreshToken(user));

        String uri = createURI(queryParams, request.getServerName(), request.getServerPort()).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }
    private String getEmail(OAuth2User oAuth2User) {
        if (oAuth2User.getAttributes().containsKey("email")) return (String) oAuth2User.getAttributes().get("email");
        Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        return (String) kakaoAccount.get("email");
    }
    private URI createURI(MultiValueMap<String, String> queryParams, String host, int port) {
        if (!host.contains("localhost") && !host.contains("127.0.0.1")){
            host = "statandus.s3-website.ap-northeast-2.amazonaws.com";
            port = 80;
        }
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host(host)
                .port(port)
                .path("auth/login")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

}