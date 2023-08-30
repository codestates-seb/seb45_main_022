package com.codestatus.domain.comment.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CommentResponseDto {
    private long commentId;

    private String nickName;

    private String profileImage;

    private int level;

    private String body;

    private LocalDateTime createDate;
}
