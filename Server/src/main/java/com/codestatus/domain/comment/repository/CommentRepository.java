package com.codestatus.domain.comment.repository;

import com.codestatus.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<Comment> findCommentByCommentIdAndDeleted(long commentId, boolean deleted);
}
