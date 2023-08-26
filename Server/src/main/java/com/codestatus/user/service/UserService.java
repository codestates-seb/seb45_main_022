package com.codestatus.user.service;

import com.codestatus.auth.utils.CustomAuthorityUtils;
import com.codestatus.exception.BusinessLogicException;
import com.codestatus.exception.ExceptionCode;
import com.codestatus.user.entity.User;
import com.codestatus.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, CustomAuthorityUtils customAuthorityUtils, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.customAuthorityUtils = customAuthorityUtils;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(User user) {
        verifyExistsEmail(user.getEmail());
        verifyExistsNickName(user.getNickName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<String> roles = customAuthorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        repository.save(user);
    }

    public User findUser(Long userId) {
        User findUser = findVerifiedUser(userId);
        return findUser;
    }

    public User findVerifiedUser(Long userId) {
        Optional<User> OptionalUser =
                repository.findById(userId);

        User findUser =
                OptionalUser.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    private void verifyExistsEmail(String email) {
        Optional<User> OptionalUser =
                repository.findByEmail(email);

        OptionalUser.ifPresent(user -> {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS_EMAIL);
        });
    }

    private void verifyExistsNickName(String nickName) {
        Optional<User> OptionalUser =
                repository.findByNickName(nickName);

        OptionalUser.ifPresent(user -> {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS_NICKNAME);
        });
    }
}
