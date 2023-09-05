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

    Page<Feed> findByCreatedAtAfterAndDeletedIsFalseOrderByLikesDesc(LocalDateTime createdAt, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT f FROM Feed f WHERE f.body LIKE %:body% AND f.deleted = false ")
    Page<Feed> findByBodyAndDeletedIsFalse(@Param("body") String body, Pageable pageable);

    @Query("SELECT f FROM Feed f WHERE f.category.categoryId = :categoryId AND f.user.nickName LIKE %:user% AND f.deleted = false ")
    Page<Feed> findByUserAndDeleted(@Param("categoryId")long categoryId, @Param("user") String user,  Pageable pageable);

    Page<Feed> findByCategory_CategoryIdAndFeedHashTags_HashTag_HashTagId(long categoryId, long hashTagId, Pageable pageable);

    @Query("SELECT f FROM Feed f WHERE f.category.categoryId = :categoryId AND f.deleted = false ")
    Page<Feed> findAllFeedByCategory(long categoryId, Pageable pageable);

    Page<Feed> findAllByCategory_CategoryIdAndBodyLikeAndDeletedIsFalse(long categoryId, String body, Pageable pageable);

    Page<Feed> findAllByDeletedIsFalse(Pageable pageable);

    Page<Feed> findAllByDeletedIsFalseAndCategoryCategoryId(long categoryId, Pageable pageable);
}
