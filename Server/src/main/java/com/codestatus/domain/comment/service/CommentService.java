package com.codestatus.domain.comment.service;

import com.codestatus.domain.comment.entity.Comment;

public interface CommentService {
    void createEntity(Comment comment);
    void updateEntity(Comment comment, long userId);
    void deleteEntity(long commentId, long userId);
}
