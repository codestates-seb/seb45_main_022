package com.codestatus.domain.feed.dto;

import com.codestatus.domain.comment.dto.CommentResponseDto;
import com.codestatus.domain.hashTag.dto.HashTagResponseDto;
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

    private int statId;

    private int level;

    private String body;

    private List<HashTagResponseDto> feedHashTags;

    private int likeCount;

//    private String feedImages;

    private List<CommentResponseDto> comments;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
