package com.codestatus.domain.status.repository;

import com.codestatus.domain.status.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatusRepository extends JpaRepository<Status, Long> {
    List<Status> findAllByUserUserId(long userId);
}
