package com.codestatus.feed.mapper;

import com.codestatus.comment.dto.CommentResponseDto;
import com.codestatus.feed.dto.FeedPatchDto;
import com.codestatus.feed.dto.FeedPostDto;
import com.codestatus.feed.dto.FeedResponseDto;
import com.codestatus.feed.entity.Feed;
import com.codestatus.feed.entity.FeedHashTag;
import com.codestatus.hashtag.dto.HashtagResponseDto;
import com.codestatus.status.entity.Stat;
import com.codestatus.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FeedMapper {

    default FeedResponseDto feedToFeedResponseDto(Feed feed){
        return FeedResponseDto.builder()
                .feedId(feed.getFeedId())
                .level(feed.getUser().getStatuses().get(feed.getCategory().getStat().getStatId().intValue()).getStatLevel())
                .body(feed.getBody())
                .feedHashTags(feed.getFeedHashTags().stream()
                        .map(feedHashTag -> HashtagResponseDto.builder()
                                .hashTagId(feedHashTag.getHashTag().getHashTagId())
                                .body(feedHashTag.getHashTag().getBody())
                                .build())
                        .collect(Collectors.toList()))
                .likes(feed.getLikes().size())
                .comments(feed.getComments().stream()
                        .map(comment -> CommentResponseDto))
                .created_at(feed.getCreatedAt())
                .build();
    }

    default List<FeedResponseDto> feedsToFeedResponseDtos(List<Feed> feeds){
        return feeds.stream()
                .map(feed -> FeedResponseDto
                        .builder()
                        .feedId(feed.getFeedId())
                        .level(feed.getUser().getStatuses().get(feed.getCategory().getStat().getStatId().intValue()).getStatLevel())
                        .body(feed.getBody())
                        .feedHashTags(feed.getFeedHashTags().stream()
                                .map(feedHashTag -> HashtagResponseDto.builder()
                                        .hashTagId(feedHashTag.getHashTag().getHashTagId())
                                        .body(feedHashTag.getHashTag().getBody())
                                        .build())
                                .collect(Collectors.toList()))
    }
    Feed feedPostDtoToFeed(FeedPostDto feedPostDto);

    Feed feedPatchDtoToFeed(FeedPatchDto feedPatchDto);

    default User mapToUser(long id) {
        User user = new User();
        user.setUserId(id);

        return user;
    }
}
