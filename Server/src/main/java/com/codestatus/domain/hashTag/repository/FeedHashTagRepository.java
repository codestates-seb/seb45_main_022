package com.codestatus.domain.hashTag.repository;

import com.codestatus.domain.hashTag.entity.FeedHashTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeedHashTagRepository extends JpaRepository<FeedHashTag, Long> {
    List<FeedHashTag> findAllByFeed_User_UserId(long userId);
    @Query(value = "select fh from FeedHashTag fh join fetch fh.hashTag where fh.feed.feedId=:feedId")
    List<FeedHashTag> findAllByFeedId(long feedId);
}
