package com.codestatus.domain.like.likeCommand;

import com.codestatus.domain.like.entity.Like;
import com.codestatus.domain.like.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Component
public class LikeCommand {

    private final LikeRepository likeRepository;

    public boolean checkIsLikeUser(long feedId, long userId){
        Optional<Like> optionalLike = likeRepository.findLikeByFeedFeedIdAndUserUserIdAndDeletedIsFalse(feedId, userId);
        return optionalLike.isPresent();
    }

}
