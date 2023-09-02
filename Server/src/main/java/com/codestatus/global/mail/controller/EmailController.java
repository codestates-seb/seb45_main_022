package com.codestatus.global.mail.controller;

import com.codestatus.global.mail.entity.Email;
import com.codestatus.global.mail.dto.EmailDto;
import com.codestatus.global.mail.mapper.EmailMapper;
import com.codestatus.global.mail.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController {
    private final EmailService emailService;
    private final EmailMapper emailMapper;

    public EmailController(EmailService emailService, EmailMapper emailMapper) {
        this.emailService = emailService;
        this.emailMapper = emailMapper;
    }

    @PostMapping("/join")
    public ResponseEntity sendJoinCode(@RequestBody EmailDto emailDto) {
        Email code = emailService.sendJoinCode(emailMapper.EmailDtoToEmail(emailDto));
        EmailDto.Response response = emailMapper.EmailToEmailDto(code);
        return ResponseEntity.ok().body(response);
    }
}
