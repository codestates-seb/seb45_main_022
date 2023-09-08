package com.codestatus.domain.user.command;

import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.repository.UserRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Component
public class UserCommand {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public User findVerifiedUser(long userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        if (!findUser.getUserStatus().equals(User.UserStatus.USER_ACTIVE)) {
            throw new BusinessLogicException(ExceptionCode.of(findUser.getUserStatus()));
        }
        return findUser;
    }
}
