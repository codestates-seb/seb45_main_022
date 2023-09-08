package com.codestatus.domain.hashTag.repository;

import com.codestatus.domain.hashTag.entity.FeedHashTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedHashTagRepository extends JpaRepository<FeedHashTag, Long> {
    List<FeedHashTag> findAllByFeed_User_UserId(long userId);
}
