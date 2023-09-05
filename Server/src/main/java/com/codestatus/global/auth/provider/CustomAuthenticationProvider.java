package com.codestatus.global.auth.provider;

import com.codestatus.domain.user.entity.User;
import com.codestatus.global.auth.userdetails.UsersDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component("authenticationProvider")
public class CustomAuthenticationProvider implements AuthenticationProvider {
    private final PasswordEncoder passwordEncoder;
    private final UsersDetailService usersDetailService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String password = (String) authentication.getCredentials();
        UsersDetailService.CustomUserDetails customUserDetails = (UsersDetailService.CustomUserDetails) usersDetailService.loadUserByUsername(email);
        if (isNotMatch(password, customUserDetails.getPassword()) || !customUserDetails.getUserStatus().equals(User.UserStatus.USER_ACTIVE)){
            throw new BadCredentialsException(email);
        }
        return new UsernamePasswordAuthenticationToken(customUserDetails, customUserDetails.getPassword(), customUserDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
    private boolean isNotMatch(String password, String encodedPassword){
        return !passwordEncoder.matches(password, encodedPassword);
    }
}
