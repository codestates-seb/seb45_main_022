package com.codestatus.feed.repository;

import com.codestatus.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository <Feed, Long> {

}
