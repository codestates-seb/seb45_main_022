package com.codestatus.domain.comment.service;

import com.codestatus.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;

public interface CommentService {
    void createEntity(Comment comment);
    Page<Comment> getEntitys(long feedId, int page, int size);
    void updateEntity(Comment comment, long userId);
    void deleteEntity(long commentId, long userId);
}
