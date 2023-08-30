package com.codestatus.domain.like.repository;

import com.codestatus.domain.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findLikeByFeed_FeedIdAndUser_UserId(long feedId, long userId);
}
