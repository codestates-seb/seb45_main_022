package com.codestatus.domain.comment.mapper;

import com.codestatus.domain.comment.dto.CommentPostDto;
import com.codestatus.domain.comment.dto.CommnetPatchDto;
import com.codestatus.domain.comment.entity.Comment;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

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

}
