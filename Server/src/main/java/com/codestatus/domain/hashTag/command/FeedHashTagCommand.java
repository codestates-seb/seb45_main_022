package com.codestatus.domain.hashTag.command;

import com.codestatus.domain.hashTag.entity.FeedHashTag;
import com.codestatus.domain.hashTag.repository.FeedHashTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Component
public class FeedHashTagCommand {
    private final FeedHashTagRepository feedHashTagRepository;

    public void createFeedHashtags(List<FeedHashTag> feedHashTags){
        feedHashTagRepository.saveAll(feedHashTags);
    }

    public void deleteFeedHashtagAll(long userId) {
        List<FeedHashTag> feedHashTagList = feedHashTagRepository.findAllByFeed_User_UserId(userId);
        deleteFeedHashtagAll(feedHashTagList);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void deleteFeedHashtagAll(List<FeedHashTag> feedHashTagList) {
        feedHashTagRepository.deleteAll(feedHashTagList);
    }
}
