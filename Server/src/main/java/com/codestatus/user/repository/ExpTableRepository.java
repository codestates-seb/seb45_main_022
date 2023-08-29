package com.codestatus.user.repository;

import com.codestatus.user.entity.Exp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpTableRepository extends JpaRepository<Exp, Long> {
}
