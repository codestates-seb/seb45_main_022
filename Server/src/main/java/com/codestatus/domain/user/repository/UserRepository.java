package com.codestatus.domain.user.repository;

import com.codestatus.domain.user.entity.User;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByNickName(String nickName);
    List<User> findAllByUserStatusAndAttendance(User.UserStatus userStatus, boolean b);
    default User findVerifiedUser(Long userId) {
        Optional<User> OptionalUser = findById(userId);
        User findUser =
                OptionalUser.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND)); // 유저가 없다면 예외 발생

        if(findUser.getUserStatus() == User.UserStatus.USER_DELETE) { // 유저가 탈퇴 상태라면 예외 발생
            throw new BusinessLogicException(ExceptionCode.USER_IS_DELETED);
        }

        return findUser;
    }
}
