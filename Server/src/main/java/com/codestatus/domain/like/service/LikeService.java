package com.codestatus.domain.like.service;

import com.codestatus.domain.like.repository.LikeRepository;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.feed.mapper.FeedMapper;
import com.codestatus.domain.like.entity.Like;
import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.mapper.UserMapper;
import com.codestatus.domain.user.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class LikeService {
    private final UserService userService;
    private final UserMapper userMapper;
    private final LikeRepository likeRepository;
    private final FeedMapper feedMapper;

    public LikeService(UserService userService, UserMapper userMapper, LikeRepository likeRepository, FeedMapper feedMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.likeRepository = likeRepository;
        this.feedMapper = feedMapper;
    }

    public void feedLikeOrDisLike(long feedId, long userId){
        userService.findVerifiedUser(userId);
        // feed 유효성 검사 feed 수정 시 구현 예정
        // 자추 불가 기능 feed service 구현 시 추가 예정
        Optional<Like> optionalLike = likeRepository.findLikeByFeed_FeedIdAndUser_UserId(feedId, userId);
        Like like;
        if (optionalLike.isPresent()) {
            like = optionalLike.get();
            like.setDeleted(!like.getDeleted());
        } else {
            like = new Like();
            Feed feed = feedMapper.feedIdToFeed(feedId);
            User user = userMapper.userIdToUser(userId);
            like.setFeed(feed);
            like.setUser(user);
            // 경험치 획득 메서드 feed category entity 수정 시 구현 예정
        }
        likeRepository.save(like);
    }
}
