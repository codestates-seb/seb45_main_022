package com.codestatus.feed.dto;

import com.codestatus.comment.dto.CommentResponseDto;
import com.codestatus.hashtag.dto.HashtagResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class FeedsResponseDto {
    private long feedId;

    private String nickName;

    private String profileImage;

    private int level;

    private String body;

    private List<HashtagResponseDto> feedHashTags;

    private int likeCount;

    private int commentCount;

//    private String feedImages;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
