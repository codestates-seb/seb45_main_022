package com.codestatus.domain.user.service;

import com.codestatus.global.auth.dto.PrincipalDto;
import com.codestatus.global.auth.utils.CustomAuthorityUtils;
import com.codestatus.global.aws.FileStorageService;
import com.codestatus.domain.status.entity.Stat;
import com.codestatus.domain.status.entity.Status;
import com.codestatus.domain.status.repository.StatRepository;
import com.codestatus.domain.status.repository.StatusRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.repository.UserRepository;
import com.codestatus.global.service.BaseService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
public class UserService implements BaseService<User> {

    private final UserRepository repository;
    private final StatRepository statRepository;
    private final StatusRepository statusRepository;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;

    public UserService(UserRepository repository, StatRepository statRepository, StatusRepository statusRepository, CustomAuthorityUtils customAuthorityUtils, PasswordEncoder passwordEncoder, FileStorageService fileStorageService) {        this.repository = repository;
        this.statRepository = statRepository;
        this.statusRepository = statusRepository;
        this.customAuthorityUtils = customAuthorityUtils;
        this.passwordEncoder = passwordEncoder;
        this.fileStorageService = fileStorageService;
    }

    // 유저 생성
    public void createEntity(User user) {
        verifyExistsEmail(user.getEmail()); // 이메일 중복 검사
        verifyExistsNickName(user.getNickName()); // 닉네임 중복 검사
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
//        user.getStatuses().addAll(Arrays.asList(strStatus, dexStatus, intStatus, charmStatus, vitalityStatus)); // status 저장
    }

    // 유저 조회
    public User findEntity(long userId) {
        User user = repository.findVerifiedUser(userId); // 유저 정보를 가져옴
        if (user.getUserStatus() == User.UserStatus.USER_ACTIVE) { // 유저가 활성화 상태라면 유저 정보 반환
            return user;
        } else if (user.getUserStatus() == User.UserStatus.USER_DELETE) { // 유저가 탈퇴 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_DELETED);
        } else { // 유저가 정지 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_BANNED);
        }
    }

    @Override
    public void updateEntity(User updateEntity, long userId) {

    }

    // 유저 닉네임 수정
    public void updateUserNickName(User user, long loginUserId) {
        User findUser = repository.findVerifiedUser(loginUserId);

        if (!findUser.getNickName().equals(user.getNickName())) { // 유저 닉네임이 수정되었다면
            verifyExistsNickName(user.getNickName()); // 닉네임 중복 검사 실행
            findUser.setNickName(user.getNickName());
            repository.save(findUser);// 유저 닉네임 수정
        }
    }

    // 비밀번호 변경
    public void updatePassword(User user, long loginUserId) {
        User findUser = repository.findVerifiedUser(loginUserId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)

        // 현재 비밀번호와 같다면 에러
        if (passwordEncoder.matches(user.getPassword(), findUser.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.USER_SAME_PASSWORD);
        }

        findUser.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(findUser);
    }

    // 유저 탈퇴
    public void deleteEntity(long loginUserId, long userId) {
        User findUser = repository.findVerifiedUser(loginUserId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)
        if (findUser.getUserStatus() == User.UserStatus.USER_DELETE) { // 유저가 이미 탈퇴 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_DELETED);
        }
        findUser.setUserStatus(User.UserStatus.USER_DELETE); // 유저 상태를 탈퇴 상태로 변경
        repository.save(findUser);
    }

    // 프로필 이미지 업로드
    public void uploadProfileImage(MultipartFile imageFile, long loginUserId) {
        User findUser = repository.findVerifiedUser(loginUserId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)
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
    private void verifyExistsNickName(String nickName) {
        Optional<User> OptionalUser =
                repository.findByNickName(nickName);

        OptionalUser.ifPresent(user -> {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS_NICKNAME); // 닉네임이 이미 존재한다면 예외 발생
        });
    }

    // stat 조회
    private Stat findStat(Long statId) {
        Optional<Stat> existingStat = statRepository.findById(statId);
        return existingStat.orElseThrow(() -> new RuntimeException("Stat with ID " + statId + " not found")); // stat이 없다면 예외 발생(테스트용)
    }

    // status 생성
    private void createStatus(User user) {
        List<Status> statusList = new ArrayList<>();
        for(int i=1; i<=5 ; i++) {
            Stat stat = findStat((long) i);
            Status status = new Status();
            status.setUser(user);
            status.setStat(stat);
            status.setStatLevel(1);
            status.setStatExp(0);
            statusList.add(status);
        }
        statusRepository.saveAll(statusList);
    }

    // 로그인한 유저의 id를 가져옴
    public Long getLoginUserId() {
        Long id = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof PrincipalDto) {
            PrincipalDto principal = (PrincipalDto) authentication.getPrincipal();
            id = principal.getId();
        }

        return id;
    }
}
