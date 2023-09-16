package com.codestatus.domain.comment.mapper;

import com.codestatus.domain.comment.dto.CommentPostDto;
import com.codestatus.domain.comment.dto.CommentResponseDto;
import com.codestatus.domain.comment.dto.CommnetPatchDto;
import com.codestatus.domain.comment.entity.Comment;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CommentMapper {
    public Comment commentPostDtoToComment(CommentPostDto requestBody, Feed feed, User user) {
        Comment comment = new Comment();
        comment.setBody(requestBody.getBody());
        comment.setFeed(feed);
        comment.setUser(user);
        return comment;
    }
    public Comment commentPatchDtoToComment(CommnetPatchDto requestBody, long commentId) {
        Comment comment = new Comment();
        comment.setBody(requestBody.getBody());
        comment.setCommentId(commentId);
        return comment;
    }

    public List<CommentResponseDto> commentToCommentResponseDto(List<Comment> commentList, int statId) {
        return commentList.stream()
                .map(comment -> CommentResponseDto.builder()
                        .commentId(comment.getCommentId())
                        .body(comment.getBody())
                        .nickname(comment.getUser().getNickname())
                        .profileImage(comment.getUser().getProfileImage())
                        .level(comment.getUser().getStatuses().get(statId-1).getStatLevel())
                        .createDate(comment.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
