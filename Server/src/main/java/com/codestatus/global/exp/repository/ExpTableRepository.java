package com.codestatus.global.exp.repository;

import com.codestatus.global.exp.entity.Exp;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpTableRepository extends JpaRepository<Exp, Long> {
}
