package com.codestatus.feed.dto;

import com.codestatus.comment.dto.CommentResponseDto;
import com.codestatus.comment.entity.Comment;
import com.codestatus.feed.entity.FeedHashTag;
import com.codestatus.hashtag.dto.HashtagResponseDto;
import com.codestatus.like.entity.Like;
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

    private List<CommentResponseDto> comments;

    private List<HashtagResponseDto> feedHashTags;

    private int likes;

    private LocalDateTime created_at;

    private LocalDateTime modified_at;

}
