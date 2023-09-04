package com.codestatus.domain.like.repository;

import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.like.entity.Like;
import com.codestatus.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
//    @Query(nativeQuery = true, value = "SELECT * FROM like WHERE feed_id=:feed AND user_id=:user")
    Optional<Like> findLikeByFeedAndUser(Feed feed, User user);
}
