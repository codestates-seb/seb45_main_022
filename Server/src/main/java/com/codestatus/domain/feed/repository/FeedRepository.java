package com.codestatus.domain.feed.repository;

import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

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

    Page<Feed> findAllByDeletedIsFalse(Pageable pageable);

    default Feed findVerifiedFeed(long feedId){
        Optional<Feed> optionalFeed = findFeedByFeedIdAndDeletedIsFalse(feedId);
        return optionalFeed.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FEED_NOT_FOUND));
    }

}
