package com.codestatus.user.repository;

import com.codestatus.user.exp.Exp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpTableRepository extends JpaRepository<Exp, Long> {
}
