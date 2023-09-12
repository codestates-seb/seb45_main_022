package com.codestatus.domain.feed.repository;

import com.codestatus.domain.feed.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FeedRepository extends JpaRepository <Feed, Long> {

    @Query("SELECT f FROM Feed f WHERE f.feedId = :feedId AND f.deleted = false ")
    Optional<Feed> findFeedByFeedIdAndDeletedIsFalse(long feedId);

    @Query(nativeQuery = true, value = "SELECT f FROM Feed f WHERE f.body LIKE %:body% AND f.deleted = false ")
    Page<Feed> findByBodyAndDeletedIsFalse(@Param("body") String body, Pageable pageable);

    @Query("SELECT f FROM Feed f WHERE f.category.categoryId = :categoryId AND f.user.nickname LIKE %:user% AND f.deleted = false ")
    Page<Feed> findByUserAndDeleted(@Param("categoryId")long categoryId, @Param("user") String user,  Pageable pageable);

    Page<Feed> findByCategory_CategoryIdAndFeedHashTags_HashTag_HashTagId(long categoryId, long hashTagId, Pageable pageable);

    Page<Feed> findByCategory_CategoryIdAndDeletedIsFalseAndFeedHashTags_HashTag_BodyContaining(long categoryId, String body, Pageable pageable);

    @Query("SELECT f FROM Feed f WHERE f.category.categoryId = :categoryId AND f.deleted = false ")
    Page<Feed> findAllFeedByCategory(long categoryId, Pageable pageable);

    Page<Feed> findAllByCategory_CategoryIdAndBodyContainingAndDeletedIsFalse(long categoryId, String body, Pageable pageable);

    Page<Feed> findAllByDeletedIsFalse(Pageable pageable);

    Page<Feed> findAllByDeletedIsFalseAndCategoryCategoryId(long categoryId, Pageable pageable);

    List<Feed> findAllByUser_UserIdAndDeletedIsFalse(long userId);

    Page<Feed> findAllByUser_UserIdAndDeletedIsFalse(long userId, Pageable pageable);

    // 일주일 안에 작성된 피드를 likes 의 사이즈 순으로 정렬해서 조회
    @Query(nativeQuery = true,
            value = "SELECT * FROM feed as f WHERE f.category_id=:categoryId and f.created_at>=:oneWeekAgo and f.deleted=false " +
                    "ORDER BY (SELECT  count(likes.feed_id) from likes where f.feed_id = likes.feed_id and likes.deleted=false) DESC")
    Page<Feed> findFeedsByCategoryAndCreatedAtAndSortLikes(
            Long categoryId,
            LocalDateTime oneWeekAgo,
            Pageable pageable
    );
}
