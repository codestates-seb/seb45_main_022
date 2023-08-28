package com.codestatus.user.repository;

import com.codestatus.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByNickName(String nickName);
    List<User> findAllByUserStatusAndAttendance(User.UserStatus userStatus, boolean b);
}
