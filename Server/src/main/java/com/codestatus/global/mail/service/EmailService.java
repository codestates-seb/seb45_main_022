package com.codestatus.global.mail.service;

import com.codestatus.global.mail.entity.Email;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public Email sendJoinCode(Email email) {
        String code = randomCodeGenerator(); // 인증번호 생성

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(email.getAddress()); // 수신자 주소
        simpleMailMessage.setSubject("CodeStatus 회원가입 인증 메일입니다."); // 메일 제목
        simpleMailMessage.setText("인증번호는 " + code + " 입니다."); // 메일 본문
        javaMailSender.send(simpleMailMessage); // 메일 전송

        email.setCode(code); // 인증번호 저장

        return email;
    }

    // 문자열 랜덤 생성
    public String randomCodeGenerator() {
        String alphabet = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialCharacters = "!@#$";
        int length = 10; // 문자열 길이

        Random random = new Random();
        StringBuilder randomString = new StringBuilder();

        length -= 2; // 특수문자 1개, 숫자 1개를 뺀 나머지 길이

        for (int i = 0; i < length; i++) {
            randomString.append(alphabet.charAt(random.nextInt(alphabet.length()))); // 8개의 알파벳 랜덤 생성
        }

        randomString.append(numbers.charAt(random.nextInt(numbers.length()))); // 알파벳 문자열에 숫자 1개 추가
        randomString.append(specialCharacters.charAt(random.nextInt(specialCharacters.length()))); // 알파벳 + 숫자 1개 문자열에 특수문자 1개 추가

        return randomString.toString(); // 문자열 반환
    }
}
