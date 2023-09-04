package com.codestatus.domain.user.repository;

import com.codestatus.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // @Query(value = "SELECT * FROM users u WHERE u.email = :email", nativeQuery = true)
    Optional<User> findByEmail(String email); // @Param("email")

    // @Query(value = "SELECT * FROM users u WHERE u.nick_name = :nickname", nativeQuery = true)
    Optional<User> findByNickName(String nickName); // @Param("nickname")

    // @Query(value = "SELECT * FROM users u WHERE u.user_status = :userStatus AND u.attendance = :attendance", nativeQuery = true)
    List<User> findAllByUserStatusAndAttendance(User.UserStatus userStatus, boolean b); // @Param("userStatus") @Param("attendance")
}

/*
* SELECT * FROM users WHERE email = 'signup@test.luv';
* SELECT * FROM users WHERE nick_name = '테스터';
* SELECT * FROM users
* WHERE user_status = 'USER_ACTIVE' // or 'USER_DELETE'
* AND attendance = FALSE;
 */
