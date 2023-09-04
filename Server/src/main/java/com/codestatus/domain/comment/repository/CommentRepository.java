package com.codestatus.domain.comment.repository;

import com.codestatus.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
//    @Query(nativeQuery = true, value = "SELECT * FROM comment as c WHERE c.comment_id=:commentId AND c.deleted=:deleted")
    Optional<Comment> findCommentByCommentIdAndDeleted(long commentId, boolean deleted);
}
