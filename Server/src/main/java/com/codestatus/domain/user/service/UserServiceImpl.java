package com.codestatus.domain.user.service;

import com.codestatus.domain.comment.command.CommentCommand;
import com.codestatus.domain.feed.command.FeedCommand;
import com.codestatus.domain.hashTag.command.FeedHashTagCommand;
import com.codestatus.domain.status.command.StatusCommand;
import com.codestatus.domain.user.command.UserCommand;
import com.codestatus.global.auth.utils.CustomAuthorityUtils;
import com.codestatus.global.aws.FileStorageService;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    private final StatusCommand statusCommand;

    private final CustomAuthorityUtils customAuthorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;

    private final List<String> defaultImage = Arrays.asList( // 기본 프로필 이미지
            "https://codestatus.s3.ap-northeast-2.amazonaws.com/default_profile_image1.png",
            "https://codestatus.s3.ap-northeast-2.amazonaws.com/default_profile_image2.png",
            "https://codestatus.s3.ap-northeast-2.amazonaws.com/default_profile_image3.png",
            "https://codestatus.s3.ap-northeast-2.amazonaws.com/default_profile_image4.png");

    // 유저 생성
    @Override
    public void createEntity(User user) {
        Optional<User> optionalUser = repository.findByEmail(user.getEmail()); // 가입 요청이 온 email 로 user table 검색

        if (optionalUser.isPresent()) { // optional 객체의 값이 있는 경우
            User findUser = optionalUser.get(); // optional 객체의 값을 get
            if (findUser.getUserStatus().equals(User.UserStatus.USER_DELETE)) { // user status 값이 DELETE 라면
                rejoinUser(findUser, user.getPassword(), user.getNickname()); // 재가입 메서드 실행
            } else { // user status 의 값이 DELETE 가 아니라면
                throw new BusinessLogicException(ExceptionCode.USER_EXISTS_EMAIL); // 중복 email 예외 발생
            }
        } else { // optional 객체의 값이 없는 경우
            joinNewUser(user); // 새로운 유저 생성 메서드 실행
        }
    }

    // 새로운 유저 생성 메서드
    private void joinNewUser(User user) {
        verifyExistsEmail(user.getEmail()); // 이메일 중복 검사
        verifyExistsNickname(user.getNickname()); // 닉네임 중복 검사
        user.setPassword(passwordEncoder.encode(user.getPassword())); // 비밀번호 암호화
        List<String> roles = customAuthorityUtils.createRoles(user.getEmail()); // 권한 생성
        user.setRoles(roles); // 권한 저장

        defaultProfileImageSet(user); // 기본 프로필 이미지 배정
        repository.save(user); // 유저 저장
        statusCommand.createStatus(user); // status 생성
    }

    // 재가입 유저 메서드
    private void rejoinUser(User findUser, String password, String nickname) {
        findUser.setUserStatus(User.UserStatus.USER_ACTIVE); // user status 를 ACTIVE 로 변경
        findUser.setPassword(passwordEncoder.encode(password)); // 비밀번호 암호화

        if (!findUser.getNickname().equals(nickname)) { // DB 의 닉네임과 재가입시 입력한 닉네임이 다르다면
            verifyExistsNickname(nickname); // 다른 유저와의 닉네임 중복검사
            findUser.setNickname(nickname); // 닉네임 set
        }

        repository.save(findUser); // 유저 저장
    }

    // 유저 조회
    @Override
    public User findEntity(long userId) {
        User user = userCommand.findVerifiedUser(userId); // 유저 검증
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
        User findUser = userCommand.findVerifiedUser(loginUserId); // 유저 검증

        if (!findUser.getNickname().equals(user.getNickname())) { // 유저 닉네임이 수정되었다면
            verifyExistsNickname(user.getNickname()); // 닉네임 중복 검사
            findUser.setNickname(user.getNickname());
            repository.save(findUser); // 유저 저장
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

        findUser.setPassword(passwordEncoder.encode(user.getPassword())); // 비밀번호 암호화
        repository.save(findUser); // 유저 저장
    }

    // 유저 탈퇴
    @Override
    public void deleteEntity(long loginUserId) {
        User findUser = userCommand.findVerifiedUser(loginUserId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)
        String fileUrl = findUser.getProfileImage();
        findUser.setUserStatus(User.UserStatus.USER_DELETE); // 유저 상태를 탈퇴 상태로 변경

        feedCommand.deleteFeedAll(findUser.getUserId()); // 유저가 작성한 feed 삭제
        feedHashTagCommand.deleteFeedHashtagAll(findUser.getUserId()); // 유저가 작성한 hashtag 삭제
        commentCommand.deleteCommentAll(findUser.getUserId()); // 유저가 작성한 comment 삭제
        statusCommand.resetStatus(findUser.getUserId()); // 유저가 가진 status 정보 초기화

        if (!defaultImage.contains(fileUrl)) { // 기본 프로필 이미지 리스트에 현재 fileUrl 이 포함되지 않는다면
            fileStorageService.deleteFile(fileUrl); // 해당 이미지 삭제
            defaultProfileImageSet(findUser); // 기본 프로필 이미지 배정
        }

        repository.save(findUser); // 유저 저장
    }

    // 프로필 이미지 업로드
    @Override
    public void uploadProfileImage(MultipartFile imageFile, long loginUserId) {
        User findUser = userCommand.findVerifiedUser(loginUserId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)
        String fileUrl = fileStorageService.storeFile(imageFile); // 파일 업로드
        findUser.setProfileImage(fileUrl); // 유저 프로필 이미지 경로 저장
        repository.save(findUser); // 유저 저장
    }

    // 프로필 이미지 초기화
    @Override
    public void resetProfileImage(long loginUserId) {
        User findUser = userCommand.findVerifiedUser(loginUserId); // 유저 검증
        String fileUrl = findUser.getProfileImage(); // 현재 프로필 이미지 url

        if(defaultImage.contains(fileUrl)) { // 기본 프로필 이미지 리스트에 현재 fileUrl 이 포함된다면
            throw new BusinessLogicException(ExceptionCode.ALREADY_DEFAULT_IMAGE); // 예외 발생
        }

        fileStorageService.deleteFile(fileUrl); // url 을 이용해 s3 에서 이미지 삭제
        defaultProfileImageSet(findUser); // 기본 프로필 이미지 배정
    }

    // 기본 프로필 이미지 배정
    private void defaultProfileImageSet(User user) {
        int randomNum = (int)(Math.random() * defaultImage.size()); // 기본 프로필 이미지 list 의 사이즈 만큼 랜덤 숫자 생성
        user.setProfileImage(defaultImage.get(randomNum)); // 생성된 랜덤 숫자로 프로필 이미지 배정
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
}
