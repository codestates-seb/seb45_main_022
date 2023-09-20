package com.codestatus.domain.hashTag.service;


import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.hashTag.entity.FeedHashTag;
import com.codestatus.domain.hashTag.entity.HashTag;
import org.springframework.data.domain.Page;

import java.util.List;

public interface HashTagService {
    void createEntityByString(Feed feed, List<String> hashTags);
    List<FeedHashTag> getFeedHashTagsByFeedId(long feedId);
    Page<HashTag> findHashTagByBody(String text, int page, int size);
}
