package com.codestatus.global.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CustomMailSender {
    @Value("${mail.username}")
    private String sender;

    private final JavaMailSender javaMailSender;

    public void sendAuthenticationCode(String code, String sendTo){
        String subject = "CodeStatus 회원가입 인증 메일입니다."; // 메일 제목
        String text = "인증번호는 " + code + " 입니다."; // 메일 본문

        sendMail(sendTo, subject, text);
    }

    public void sendReportAlarm(long targetId, String target, String type){
        String subject = type + " " + targetId + " 누적 신고";
        String text = type + " id: " + targetId + " 대상: "+ target + " 누적 신고";

        sendMail(sender, subject, text);
    }
    private void sendMail(String sendTo, String subject, String text){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(sendTo);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(text);
        javaMailSender.send(simpleMailMessage);
    }
}
