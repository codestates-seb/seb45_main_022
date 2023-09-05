package com.codestatus.domain.hashTag.repository;

import com.codestatus.domain.hashTag.entity.HashTag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface HashTagRepository extends JpaRepository <HashTag, Long> {

    @Query("SELECT h FROM HashTag h WHERE h.body = :body")
    Optional<HashTag> findHashTagByBody(@Param("body") String body);

    @Query("SELECT h FROM HashTag h WHERE h.body LIKE %:body%")
    Page<HashTag> findHashTagByBodyLike(@Param("body") String body, Pageable pageable);

}
