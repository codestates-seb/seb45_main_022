package com.codestatus.auth.dto;

import lombok.Getter;

import java.security.Principal;

@Getter
public class PrincipalDto implements Principal {
    Long id;
    String email;

    public PrincipalDto(Integer id, String email) {

        this.id = Long.valueOf(id);
        this.email = email;
    }

    @Override
    public String getName() {
        return email;
    }
}
