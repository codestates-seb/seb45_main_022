package com.codestatus.status.repository;

import com.codestatus.status.entity.Stat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatRepository extends JpaRepository<Stat, Long> {

}
