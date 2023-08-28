package com.codestatus.feed.service;

import com.codestatus.feed.mapper.FeedMapper;
import com.codestatus.feed.repository.FeedRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedMapper feedMapper;

    public FeedService(FeedRepository feedRepository, FeedMapper feedMapper) {
        this.feedRepository = feedRepository;
        this.feedMapper = feedMapper;
    }

}
