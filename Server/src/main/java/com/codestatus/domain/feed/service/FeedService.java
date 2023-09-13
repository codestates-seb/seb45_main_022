package com.codestatus.domain.feed.service;

import com.codestatus.domain.feed.entity.Feed;
import org.springframework.data.domain.Page;

public interface FeedService {
    void createEntity(Feed feed);
    Feed findEntity(long feedId);
    Page<Feed> findAllFeedByCategory(long categoryId, int page, int size);
    Page<Feed> findWeeklyBestFeeds(long categoryId, int page, int size);
    Page<Feed> findFeedByBodyAndCategory(long categoryId, String text, int page, int size);
    Page<Feed> findFeedByUserAndCategory(long categoryId, String text, int page, int size);
    Page<Feed> findFeedByHashTagAndCategory(long categoryId, long hashTagId, int page, int size);
    Page<Feed> findFeedByHashTagBody(long categoryId, String body, int page, int size);
    Page<Feed> findAllFeedByDeleted(int page, int size);
    void updateEntity(Feed feed, long userId);
    Page<Feed> myPost(long userId, int page, int size);
    void deleteEntity(long feedId, long userId);
    Page<Feed> findAllEntity(int page, int size);
}
