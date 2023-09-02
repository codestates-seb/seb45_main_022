package com.codestatus.global.mail.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class EmailDto {
    private String address;

    @Getter
    @Setter
    public static class Response {
        private String code;
    }
}
