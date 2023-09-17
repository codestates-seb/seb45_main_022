package com.codestatus.domain.like.likeCommand;

import com.codestatus.domain.like.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Component
public class LikeCommand {

    private final LikeRepository likeRepository;

    public boolean checkIsLikeUser(long feedId, long userId){
        return likeRepository.existsByFeedFeedIdAndUserUserIdAndDeletedIsFalse(feedId, userId);
    }

}
