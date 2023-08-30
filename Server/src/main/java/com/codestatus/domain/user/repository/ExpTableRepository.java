package com.codestatus.domain.user.repository;

import com.codestatus.domain.user.entity.Exp;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpTableRepository extends JpaRepository<Exp, Long> {
}
