package com.codestatus.user.service;

import com.codestatus.auth.dto.PrincipalDto;
import com.codestatus.auth.utils.CustomAuthorityUtils;
import com.codestatus.exception.BusinessLogicException;
import com.codestatus.exception.ExceptionCode;
import com.codestatus.status.entity.Stat;
import com.codestatus.status.entity.Status;
import com.codestatus.status.repository.StatRepository;
import com.codestatus.status.repository.StatusRepository;
import com.codestatus.user.entity.User;
import com.codestatus.user.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public UserService(UserRepository repository, StatRepository statRepository, StatusRepository statusRepository, CustomAuthorityUtils customAuthorityUtils, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.statRepository = statRepository;
        this.statusRepository = statusRepository;
        this.customAuthorityUtils = customAuthorityUtils;
        this.passwordEncoder = passwordEncoder;
    }

    // 유저 생성
    public void createUser(User user) {
        verifyExistsEmail(user.getEmail());
        verifyExistsNickName(user.getNickName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<String> roles = customAuthorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        repository.save(user);

        Stat strStat = findStat(1L);
        Stat dexStat = findStat(2L);
        Stat intStat = findStat(3L);
        Stat charmStat = findStat(4L);
        Stat vitalityStat = findStat(5L);

        Status strStatus = createStatus(user, strStat, 1, 0);
        Status dexStatus = createStatus(user, dexStat, 1, 0);
        Status intStatus = createStatus(user, intStat, 1, 0);
        Status charmStatus = createStatus(user, charmStat, 1, 0);
        Status vitalityStatus = createStatus(user, vitalityStat, 1, 0);
        user.getStatuses().addAll(Arrays.asList(strStatus, dexStatus, intStatus, charmStatus, vitalityStatus));
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
    public void checkAttendance(int chosenStat) {
        Long userId = getLoginUserId(); // 로그인한 유저의 id를 가져옴
        User findUser = findVerifiedUser(userId); // 유저 검증 메서드(유저가 존재하지 않으면 예외처리)

        if(findUser.isAttendance()) { // 이미 출석체크를 했다면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_ALREADY_CHECKED_ATTENDANCE);
        }

        switch (chosenStat) {
            case 0: // 힘
                findUser.getStatuses().get(0).setStatExp(findUser.getStatuses().get(0).getStatExp() + 10); // 힘 경험치 10 증가
                findUser.setAttendance(true); // 출석체크 상태 true로 변경
                repository.save(findUser);
                break;
            case 1: // 민첩
                findUser.getStatuses().get(1).setStatExp(findUser.getStatuses().get(1).getStatExp() + 10); // 민첩 경험치 10 증가
                findUser.setAttendance(true);
                repository.save(findUser);
                break;
            case 2: // 지능
                findUser.getStatuses().get(2).setStatExp(findUser.getStatuses().get(2).getStatExp() + 10); // 지능 경험치 10 증가
                findUser.setAttendance(true);
                repository.save(findUser);
                break;
            case 3: // 매력
                findUser.getStatuses().get(3).setStatExp(findUser.getStatuses().get(3).getStatExp() + 10); // 매력 경험치 10 증가
                findUser.setAttendance(true);
                repository.save(findUser);
                break;
            case 4: // 생활력
                findUser.getStatuses().get(4).setStatExp(findUser.getStatuses().get(4).getStatExp() + 10); // 생활력 경험치 10 증가
                findUser.setAttendance(true);
                repository.save(findUser);
                break;
        }
    }

    // 가입된 유저인지 조회
    public User findVerifiedUser(Long userId) {
        Optional<User> OptionalUser =
                repository.findById(userId);

        User findUser =
                OptionalUser.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)); // 유저가 없다면 예외 발생
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
        return existingStat.orElseThrow(() -> new RuntimeException("Stat with ID " + statId + " not found")); // Handle this exception appropriately
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
        List<User> users = repository.findAllByUserStatusAndAttendance(User.UserStatus.USER_ACTIVE, true);
        for (User user : users) {
            user.setAttendance(false);
        }
        repository.saveAll(users);
    }


    // 로그인한 유저의 id를 가져옴(헤더의 토큰에 포함된 유저의 id)
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
