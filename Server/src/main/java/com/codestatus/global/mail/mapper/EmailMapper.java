package com.codestatus.global.mail.mapper;

import com.codestatus.global.mail.entity.Email;
import com.codestatus.global.mail.dto.EmailDto;
import org.springframework.stereotype.Component;

@Component
public class EmailMapper {
    public Email EmailDtoToEmail(EmailDto emailDto) {
        Email email = new Email();
        email.setAddress(emailDto.getAddress());
        return email;
    }

    public EmailDto.Response EmailToEmailDto(Email code) {
        EmailDto.Response response = new EmailDto.Response();
        response.setCode(code.getCode());
        return response;
    }
}
