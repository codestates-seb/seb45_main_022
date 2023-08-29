package com.codestatus.feed.repository;

import com.codestatus.feed.entity.Feed;
import com.codestatus.hashtag.entity.HashTag;
import com.codestatus.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FeedRepository extends JpaRepository <Feed, Long> {

    @Query("SELECT f FROM Feed f WHERE f.feedId = :feedId AND f.deleted = :deleted ")
    Optional<Feed> findByFeedIdAndDeleted(long feedId, boolean deleted);

    @Query("SELECT f FROM Feed f WHERE f.body = :body AND f.deleted = :deleted ")
    Page<Feed> findByBodyAndDeleted(@Param("body") String body, boolean deleted, Pageable pageable);

    @Query("SELECT f FROM Feed f WHERE f.user = :text AND f.deleted = :deleted ")
    Page<Feed> findByUserAndDeleted(@Param("user") String text, boolean deleted, Pageable pageable);

    @Query("SELECT f FROM Feed f WHERE f.feedId = :text AND f.deleted = :deleted ")
    Page<Feed> findByHashTagAndDeleted(@Param("hashTag") String text, boolean deleted, Pageable pageable);

    Page<Feed> findAllByDeleted(boolean deleted, Pageable pageable);



}
