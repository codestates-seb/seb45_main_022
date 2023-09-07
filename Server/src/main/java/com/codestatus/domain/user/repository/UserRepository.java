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
    Optional<User> findByNickname(String nickName); // @Param("nickname")
}

/*
* SELECT * FROM users WHERE email = 'signup@test.luv';
* SELECT * FROM users WHERE nick_name = '테스터';
* */