package com.codestatus.domain.feed.service;

import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.global.service.BaseService;

public interface FeedService extends BaseService<Feed> {
    Feed findVerifiedFeed(long feedId);
}
