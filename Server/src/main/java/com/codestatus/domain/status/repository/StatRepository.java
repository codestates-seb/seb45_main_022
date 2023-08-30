package com.codestatus.domain.status.repository;

import com.codestatus.domain.status.entity.Stat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatRepository extends JpaRepository<Stat, Long> {

}
