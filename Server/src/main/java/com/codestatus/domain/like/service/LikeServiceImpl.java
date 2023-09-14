package com.codestatus.domain.like.service;

import com.codestatus.domain.feed.command.FeedCommand;
import com.codestatus.domain.like.repository.LikeRepository;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.like.entity.Like;
import com.codestatus.domain.level.command.LevelCommand;
import com.codestatus.domain.user.command.UserCommand;
import com.codestatus.domain.user.entity.User;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
    @Value("${exp.like-exp}")
    private int likeExp;
    private final UserCommand userCommand;
    private final LevelCommand levelCommand;
    private final FeedCommand feedCommand;
    private final LikeRepository likeRepository;

    @Override
    public void feedLikeOrDisLike(long feedId, long userId){
        // user, feed 유효성 검사
        User user = userCommand.findVerifiedUser(userId);
        Feed feed = feedCommand.findVerifiedFeed(feedId);
        // 자추 불가
        if (feed.getUser().getUserId() == userId) throw new BusinessLogicException(ExceptionCode.LIKE_BAD_REQUEST);

        Optional<Like> optionalLike = likeRepository.findLikeByFeedAndUser(feed, user);
        Like like;
        // 좋아요 존재 시 현재 deleted 상태를 반대로 바꿈
        if (optionalLike.isPresent()) {
            like = optionalLike.get();
            like.setDeleted(!like.getDeleted());
        } else {
            // 좋아요 없으면 새로 생성하고, 피드 주인 경험치 획득하고 레벨업 검사
            like = new Like();
            like.setFeed(feed);
            like.setUser(user);
            // 경험치 획득 및 level up  check 메서드
            levelCommand.gainExp(feed.getUser(), likeExp, feed.getCategory().getStat().getStatId().intValue());
        }
        likeRepository.save(like);
    }
}
