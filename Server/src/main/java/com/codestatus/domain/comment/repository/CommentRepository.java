package com.codestatus.domain.comment.repository;

import com.codestatus.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
//    @Query(nativeQuery = true, value = "SELECT * FROM comment as c WHERE c.comment_id=:commentId AND c.deleted=:deleted")
    Optional<Comment> findCommentByCommentIdAndDeleted(long commentId, boolean deleted);

    List<Comment> findAllByUserUserIdAndDeletedIsFalse(long userId);
    @Query(value = "select c from Comment c join fetch c.user u join fetch u.statuses where c.feed.feedId=:feedId and c.deleted=false",
    countQuery = "select count(c) from Comment c where c.feed.feedId=:feedId and c.deleted=false")
    Page<Comment> findAllByFeed(long feedId, Pageable pageable);
}
