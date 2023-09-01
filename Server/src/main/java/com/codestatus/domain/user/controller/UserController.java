package com.codestatus.domain.user.controller;

import com.codestatus.domain.user.dto.UserDto;
import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.mapper.UserMapper;
import com.codestatus.domain.user.service.LevelService;
import com.codestatus.domain.user.service.UserService;
import com.codestatus.global.auth.dto.PrincipalDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Validated
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserMapper userMapper;
    private final UserService service;
    private final LevelService levelService;

    public UserController(UserMapper userMapper, UserService service, LevelService levelService) {
        this.userMapper = userMapper;
        this.service = service;
        this.levelService = levelService;
    }

    // 유저 가입 컨트롤러
    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.signup requestBody) {
        User newUser = userMapper.userPostToUser(requestBody); // PostDto -> Entity
        service.createEntity(newUser); // 유저 가입 메서드 호출
        return ResponseEntity.status(HttpStatus.CREATED).body("signup success"); // 가입 성공 메시지 반환
    }

    // 유저 조회 컨트롤러
    @GetMapping("/mypage")
    public ResponseEntity<UserDto.Response> getUser(@AuthenticationPrincipal PrincipalDto principal) {
        User user = service.findEntity(principal.getId()); // 유저 조회 메서드 호출
        UserDto.Response responseBody = userMapper.userToUserResponse(user); // Entity -> ResponseDto
        return ResponseEntity.status(HttpStatus.OK).body(responseBody); // 유저 정보 반환
    }

    // 유저 닉네임 수정 컨트롤러
    @PatchMapping("/mypage/edit/nickname")
    public ResponseEntity patchUserNickName(@Valid @RequestBody UserDto.PatchNickName requestBody,
                                            @AuthenticationPrincipal PrincipalDto principal) {
        User user = userMapper.userPatchToUser(requestBody); // PatchDto -> Entity
        service.updateUserNickName(user, principal.getId()); // 유저 닉네임 수정 메서드 호출
        return ResponseEntity.status(HttpStatus.OK).body("nickname patch success"); // 닉네임 수정 성공 메시지 반환
    }

    // 유저 비밀번호 수정 컨트롤러
    @PatchMapping("/mypage/edit/password")
    public ResponseEntity patchUserPassword(@Valid @RequestBody UserDto.PatchPassword requestBody,
                                            @AuthenticationPrincipal PrincipalDto principal) {
        User user = userMapper.userPatchPasswordToUser(requestBody); // PatchDto -> Entity
        service.updatePassword(user, principal.getId()); // 유저 비밀번호 수정 메서드 호출
        return ResponseEntity.status(HttpStatus.OK).body("password patch success"); // 비밀번호 수정 성공 메시지 반환
    }

    // 출석체크 컨트롤러
    @PostMapping("/mypage/attendance/{chosenStat}")
    public ResponseEntity checkAttendance(@PathVariable @Min(0) @Max(4) int chosenStat,
                                          @AuthenticationPrincipal PrincipalDto principal) {
        levelService.checkAttendance(chosenStat, principal.getId()); // 출석체크 메서드 호출
        return ResponseEntity.status(HttpStatus.OK).body("attendance check success"); // 출석체크 성공 메시지 반환
    }

    // 프로필 이미지 업로드
    @PostMapping("/mypage/edit/image")
    public ResponseEntity uploadProfileImage(@RequestParam("imageFile") MultipartFile imageFile,
                                             @AuthenticationPrincipal PrincipalDto principal) {
        service.uploadProfileImage(imageFile); // 프로필 이미지 업로드 메서드 호출
        return ResponseEntity.status(HttpStatus.OK).body("profile image upload success"); // 프로필 이미지 업로드 성공 메시지 반환
    }

    // 유저 탈퇴
    @DeleteMapping("/mypage/delete")
    public ResponseEntity deleteUser(@AuthenticationPrincipal PrincipalDto principal) {
        service.deleteEntity(principal.getId(), principal.getId()); // 유저 탈퇴 메서드 호출
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 유저 탈퇴 성공
    }
}
