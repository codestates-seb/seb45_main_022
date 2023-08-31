package com.codestatus.domain.feed.dto;

import com.codestatus.domain.comment.dto.CommentResponseDto;
import com.codestatus.domain.comment.entity.Comment;
import com.codestatus.domain.feed.entity.FeedHashTag;
import com.codestatus.domain.hashtag.dto.HashtagResponseDto;
import com.codestatus.domain.like.entity.Like;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class FeedResponseDto {

    private long feedId;

    private String nickName;

    private String profileImage;

    private int level;

    private String body;

    private List<HashtagResponseDto> feedHashTags;

    private int likeCount;

//    private String feedImages;

    private List<CommentResponseDto> comments;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}