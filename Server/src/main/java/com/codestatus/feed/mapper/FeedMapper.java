package com.codestatus.feed.mapper;

import com.codestatus.feed.entity.Feed;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FeedMapper {
    default Feed feedIdToFeed(Long feedId){
        Feed feed = new Feed();
        feed.setFeedId(feedId);
        return feed;
    }
}
