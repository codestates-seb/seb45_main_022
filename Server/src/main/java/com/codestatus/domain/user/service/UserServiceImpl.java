package com.codestatus.domain.user.service;

import com.codestatus.domain.comment.command.CommentCommand;
import com.codestatus.domain.feed.command.FeedCommand;
import com.codestatus.domain.hashTag.command.FeedHashTagCommand;
import com.codestatus.domain.user.command.UserCommand;
import com.codestatus.global.auth.utils.CustomAuthorityUtils;
import com.codestatus.global.aws.FileStorageService;
import com.codestatus.domain.status.entity.Stat;
import com.codestatus.domain.status.entity.Status;
import com.codestatus.domain.status.repository.StatusRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    
    private final UserCommand userCommand;
    private final FeedCommand feedCommand;
    private final FeedHashTagCommand feedHashTagCommand;
    private final CommentCommand commentCommand;

    private final StatusRepository statusRepository;

    private final CustomAuthorityUtils customAuthorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;

    // 유저 생성
    @Override
    public void createEntity(User user) {
        verifyExistsEmail(user.getEmail()); // 이메일 중복 검사
        verifyExistsNickname(user.getNickname()); // 닉네임 중복 검사
        user.setPassword(passwordEncoder.encode(user.getPassword())); // 비밀번호 암호화
        List<String> roles = customAuthorityUtils.createRoles(user.getEmail()); // 권한 생성
        user.setRoles(roles); // 권한 저장

        List<String> defaultImage = Arrays.asList( // 프로필 이미지
                "https://codestatus.s3.ap-northeast-2.amazonaws.com/default_profile_image1.png",
                "https://codestatus.s3.ap-northeast-2.amazonaws.com/default_profile_image2.png",
                "https://codestatus.s3.ap-northeast-2.amazonaws.com/default_profile_image3.png",
                "https://codestatus.s3.ap-northeast-2.amazonaws.com/default_profile_image4.png");
        int random = (int)(Math.random() * defaultImage.size());

        user.setProfileImage(defaultImage.get(random)); // 프로필 이미지 랜덤 배정
        repository.save(user); // 유저 저장

        // 유저 생성 시 기본 status 생성
        createStatus(user);
    }

    // 유저 조회
    @Override
    public User findEntity(long userId) {
        User user = userCommand.findVerifiedUser(userId); // 유저 정보를 가져옴
        if (user.getUserStatus() == User.UserStatus.USER_ACTIVE) { // 유저가 활성화 상태라면 유저 정보 반환
            return user;
        } else if (user.getUserStatus() == User.UserStatus.USER_DELETE) { // 유저가 탈퇴 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_DELETED);
        } else { // 유저가 정지 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_BANNED);
        }
    }

    // 유저 닉네임 수정
    @Override
    public void updateUserNickname(User user, long loginUserId) {
        User findUser = userCommand.findVerifiedUser(loginUserId);

        if (!findUser.getNickname().equals(user.getNickname())) { // 유저 닉네임이 수정되었다면
            verifyExistsNickname(user.getNickname()); // 닉네임 중복 검사
            findUser.setNickname(user.getNickname());
            repository.save(findUser);// 유저 닉네임 수정
        }
    }

    // 비밀번호 변경
    @Override
    public void updatePassword(User user, long loginUserId) {
        User findUser = userCommand.findVerifiedUser(loginUserId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)

        // 현재 비밀번호와 같다면 에러
        if (passwordEncoder.matches(user.getPassword(), findUser.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.USER_SAME_PASSWORD);
        }

        findUser.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(findUser);
    }

    // 유저 탈퇴
    @Override
    public void deleteEntity(long loginUserId) {
        User findUser = userCommand.findVerifiedUser(loginUserId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)

        findUser.setUserStatus(User.UserStatus.USER_DELETE); // 유저 상태를 탈퇴 상태로 변경

        feedCommand.deleteFeedAll(findUser.getUserId());
        feedHashTagCommand.deleteFeedHashtagAll(findUser.getUserId());
        commentCommand.deleteCommentAll(findUser.getUserId());

        repository.save(findUser);
    }

    // 프로필 이미지 업로드
    @Override
    public void uploadProfileImage(MultipartFile imageFile, long loginUserId) {
        User findUser = userCommand.findVerifiedUser(loginUserId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)
        String fileUrl = fileStorageService.storeFile(imageFile); // 파일 업로드
        findUser.setProfileImage(fileUrl); // 유저 프로필 이미지 경로 저장
        repository.save(findUser); // 유저 저장
    }

    // 이메일 중복 검사
    private void verifyExistsEmail(String email) {
        Optional<User> OptionalUser =
                repository.findByEmail(email);

        OptionalUser.ifPresent(user -> {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS_EMAIL); // 이메일이 이미 존재한다면 예외 발생
        });
    }

    // 닉네임 중복 검사
    private void verifyExistsNickname(String nickname) {
        Optional<User> OptionalUser =
                repository.findByNickname(nickname);

        OptionalUser.ifPresent(user -> {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS_NICKNAME); // 닉네임이 이미 존재한다면 예외 발생
        });
    }

    // status 생성
    private void createStatus(User user) {
        List<Status> statusList = new ArrayList<>();
        for(int i=1; i<=5 ; i++) {
            Stat stat = new Stat();
            stat.setStatId((long) i);

            Status status = new Status();
            status.setUser(user);
            status.setStat(stat);
            status.setStatLevel(1);
            status.setStatExp(0);
            status.setRequiredExp(100); // level1 -> level2 초기 필요 경험치
            statusList.add(status);
        }
        statusRepository.saveAll(statusList);
    }
}
