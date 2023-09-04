package com.codestatus.domain.comment.service;

import com.codestatus.domain.comment.entity.Comment;
import com.codestatus.global.service.BaseService;

import java.util.List;

public interface CommentService extends BaseService<Comment> {
    void deleteComment(List<Comment> comments);
}
