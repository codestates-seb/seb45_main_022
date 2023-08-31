package com.codestatus.domain.user.service;

import com.codestatus.global.auth.dto.PrincipalDto;
import com.codestatus.global.auth.utils.CustomAuthorityUtils;
import com.codestatus.global.aws.FileStorageService;
import com.codestatus.domain.status.entity.Stat;
import com.codestatus.domain.status.entity.Status;
import com.codestatus.domain.status.repository.StatRepository;
import com.codestatus.domain.status.repository.StatusRepository;
import com.codestatus.domain.user.repository.ExpTableRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;
    private final StatRepository statRepository;
    private final StatusRepository statusRepository;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;
    private final ExpTableRepository expTableRepository;

    public UserService(UserRepository repository, StatRepository statRepository, StatusRepository statusRepository, CustomAuthorityUtils customAuthorityUtils, PasswordEncoder passwordEncoder, FileStorageService fileStorageService, ExpTableRepository expTableRepository) {
        this.repository = repository;
        this.statRepository = statRepository;
        this.statusRepository = statusRepository;
        this.customAuthorityUtils = customAuthorityUtils;
        this.passwordEncoder = passwordEncoder;
        this.fileStorageService = fileStorageService;
        this.expTableRepository = expTableRepository;
    }

    // 유저 생성
    public void createUser(User user) {
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

        // 유저 생성 시 기본 stat 조회
        Stat strStat = findStat(1L);
        Stat dexStat = findStat(2L);
        Stat intStat = findStat(3L);
        Stat charmStat = findStat(4L);
        Stat vitalityStat = findStat(5L);

        // 유저 생성 시 기본 status 생성
        Status strStatus = createStatus(user, strStat, 1, 0);
        Status dexStatus = createStatus(user, dexStat, 1, 0);
        Status intStatus = createStatus(user, intStat, 1, 0);
        Status charmStatus = createStatus(user, charmStat, 1, 0);
        Status vitalityStatus = createStatus(user, vitalityStat, 1, 0);
        user.getStatuses().addAll(Arrays.asList(strStatus, dexStatus, intStatus, charmStatus, vitalityStatus)); // status 저장
    }

    // 유저 조회
    public User findUser() {
        Long userId = getLoginUserId(); // 로그인한 유저의 id를 가져옴(헤더의 토큰에 포함된 유저의 id)
        User user = findVerifiedUser(userId); // 유저 정보를 가져옴
        if (user.getUserStatus() == User.UserStatus.USER_ACTIVE) { // 유저가 활성화 상태라면 유저 정보 반환
            return user;
        } else if (user.getUserStatus() == User.UserStatus.USER_DELETE) { // 유저가 탈퇴 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_DELETED);
        } else { // 유저가 정지 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_BANNED);
        }
    }

    // 유저 닉네임 수정
    public void updateUserNickName(User user) {
        Long userId = getLoginUserId(); // 로그인한 유저의 id
        User findUser = findVerifiedUser(userId);

        if (!findUser.getNickName().equals(user.getNickName())) { // 유저 닉네임이 수정되었다면
            verifyExistsNickName(user.getNickName()); // 닉네임 중복 검사 실행
            findUser.setNickName(user.getNickName()); // 유저 닉네임 수정
        }

        repository.save(findUser);
    }

    // 비밀번호 변경
    public void updatePassword(User user) {
        Long userId = getLoginUserId(); // 로그인한 유저의 id를 가져옴
        User findUser = findVerifiedUser(userId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)

        // 현재 비밀번호와 같다면 에러
        if (passwordEncoder.matches(user.getPassword(), findUser.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.USER_SAME_PASSWORD);
        }

        findUser.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(findUser);
    }

    // 출석체크
    public void checkAttendance(int chosenStat) { // chosenStat: 0(str), 1(dex), 2(int), 3(charm), 4(vitality)
        Long userId = getLoginUserId(); // 로그인한 유저의 id를 가져옴
        User findUser = findVerifiedUser(userId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)

        int expGain = 10; // 출석체크로 얻는 경험치

        if(findUser.isAttendance()) { // 이미 출석체크를 했다면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_ALREADY_CHECKED_ATTENDANCE);
        }

        findUser.getStatuses().get(chosenStat).setStatExp(findUser.getStatuses().get(chosenStat).getStatExp() + expGain); // 선택한 stat 경험치 증가
        levelUpCheck(userId, chosenStat); // 레벨업 체크
        findUser.setAttendance(true); // 출석체크 상태를 true로 변경
        repository.save(findUser);
    }

    // 유저 탈퇴
    public void deleteUser() {
        Long userId = getLoginUserId(); // 로그인한 유저의 id를 가져옴
        User findUser = findVerifiedUser(userId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)
        if (findUser.getUserStatus() == User.UserStatus.USER_DELETE) { // 유저가 이미 탈퇴 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_DELETED);
        }
        findUser.setUserStatus(User.UserStatus.USER_DELETE); // 유저 상태를 탈퇴 상태로 변경
        repository.save(findUser);
    }

    // 프로필 이미지 업로드
    public void uploadProfileImage(MultipartFile imageFile) {
        Long userId = getLoginUserId(); // 로그인한 유저의 id를 가져옴
        User findUser = findVerifiedUser(userId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)
        String fileUrl = fileStorageService.storeFile(imageFile); // 파일 업로드
        findUser.setProfileImage(fileUrl); // 유저 프로필 이미지 경로 저장
        repository.save(findUser); // 유저 저장
    }

    // 가입된 유저인지 조회
    public User findVerifiedUser(Long userId) {
        Optional<User> OptionalUser =
                repository.findById(userId);

        User findUser =
                OptionalUser.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)); // 유저가 없다면 예외 발생

        if(findUser.getUserStatus() == User.UserStatus.USER_DELETE) { // 유저가 탈퇴 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_DELETED);
        }

        return findUser;
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
    private Status createStatus(User user, Stat stat, int statLevel, int statExp) {
        Status status = new Status();
        status.setUser(user);
        status.setStat(stat);
        status.setStatLevel(statLevel);
        status.setStatExp(statExp);
        return statusRepository.save(status);
    }

    /*
    만약 출석체크 상태를 변경해야 할 유저가 많아진다면
    서버에 부담이 되지 않을까?
     */

    // 유저 상태가 USER_ACTIVE인 유저와 출석체크 상태가 true인 유저만 변경(매일 자정마다 실행)
    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Seoul") // cron = "0 0 0 * * ?", zone = "Asia/Seoul" <- 매일 자정마다 실행
    public void updateAttendance() {
        List<User> users = repository.findAllByUserStatusAndAttendance(User.UserStatus.USER_ACTIVE, true); // 유저 상태가 USER_ACTIVE인 유저와 출석체크 상태가 true인 유저만 조회
        for (User user : users) { // 출석체크 상태를 false로 변경
            user.setAttendance(false);
        }
        repository.saveAll(users);
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

    public void levelUpCheck(Long userId, int chooseStat) { // chooseStat: 0(str), 1(dex), 2(int), 3(charm), 4(vitality)
        User findUser = findVerifiedUser(userId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)
        int currentLevel = findUser.getStatuses().get(chooseStat).getStatLevel(); // 현재 레벨
        int currentExp = findUser.getStatuses().get(chooseStat).getStatExp(); // 현재 경험치
        int requiredExp = expTableRepository.findById((long) currentLevel).get().getRequired(); // 필요 경험치
        int maxLevel = 100; // 최대 레벨

        if (currentLevel >= maxLevel) { // 현재 레벨이 최대 레벨이라면 레벨업 불가
            return;
        }

        if (currentExp >= requiredExp) { // 현재 경험치가 필요 경험치보다 많다면 레벨업
            currentLevel += 1; // 레벨업
            findUser.getStatuses().get(chooseStat).setStatLevel(currentLevel); // 레벨 저장
            currentExp -= requiredExp; // 현재 경험치에서 필요 경험치 차감
            findUser.getStatuses().get(chooseStat).setStatExp(currentExp); // 경험치 차감
        }

        // 현재 레벨에서 다음 레벨까지 필요한 경험치 = 다음 레벨까지 필요한 경험치 - 현재 레벨까지 필요한 경험치 (백분률로 저장)
        int nextLevelRequiredExp = expTableRepository.findById((long) (currentLevel)).get().getRequired() - currentExp;
        findUser.getStatuses().get(chooseStat).setRequiredExp(nextLevelRequiredExp); // 다음 레벨까지 필요한 경험치 저장

        repository.save(findUser); // 유저 정보 저장
    }
}
