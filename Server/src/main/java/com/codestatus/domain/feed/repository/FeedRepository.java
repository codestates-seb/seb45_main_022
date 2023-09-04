package com.codestatus.domain.feed.repository;

import com.codestatus.domain.feed.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface FeedRepository extends JpaRepository <Feed, Long> {

    @Query("SELECT f FROM Feed f WHERE f.feedId = :feedId AND f.deleted = false ")
    Optional<Feed> findFeedByFeedIdAndDeletedIsFalse(long feedId);

    @Query("SELECT f FROM Feed f WHERE f.category.categoryId = :categoryId AND f.feedId =:feedId AND f.deleted = false")
    Optional<Feed> findFeedByCategoryIdAndFeedIdAndDeletedIsFalse(@Param("categoryId")long categoryId,@Param("feedId") long feedId);

    Page<Feed> findByCreatedAtAfterAndDeletedIsFalseOrderByLikesDesc(LocalDateTime createdAt, Pageable pageable);

    @Query("SELECT f FROM Feed f WHERE f.body = :body AND f.deleted = false ")
    Page<Feed> findByBodyAndDeletedIsFalse(@Param("body") String body, Pageable pageable);



    @Query("SELECT f FROM Feed f WHERE f.category = :categoryId AND f.body = :body AND f.deleted = false")
    Page<Feed> findByCategoryAndBodyAndDeleted(@Param("categoryId")long categoryId,@Param("body") String body, Pageable pageable);

    @Query("SELECT f FROM Feed f WHERE f.category = :categoryId AND f.deleted = false ")
    Page<Feed> findAllFeedByCategory(long categoryId, Pageable pageable);

//    @Query("SELECT f FROM Feed f WHERE f.user = :text AND f.deleted = :deleted ")
//    Page<Feed> findByUserAndDeleted(@Param("user") String text, boolean deleted, Pageable pageable);
//
//    @Query("SELECT f FROM Feed f WHERE f.feedHashTags = :hashTag AND f.deleted = :deleted ")
//    Page<Feed> findByHashTagAndDeleted(@Param("hashTag") String hashTag, boolean deleted, Pageable pageable);

    Page<Feed> findAllByDeletedIsFalse(Pageable pageable);

    Page<Feed> findAllByDeletedIsFalseAndCategoryCategoryId(long categoryId, Pageable pageable);



}
