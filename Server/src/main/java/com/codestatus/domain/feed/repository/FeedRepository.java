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
import java.util.Set;

public interface FeedRepository extends JpaRepository <Feed, Long> {
    // feed 리스트에서 user가 좋아요 한 feed의 id 만
    @Query("SELECT f.feedId FROM Feed f JOIN f.likes l JOIN l.user u WHERE f IN :feeds AND u.userId = :userId AND l.deleted = false")
    Set<Long> findFeedsLikedByUserInList(@Param("userId") long userId, @Param("feeds") List<Feed> feeds);

    // user data와 함께 조회
    @Query("select f from Feed f join fetch f.user u where f.feedId=:feedId")
    Optional<Feed> findByFeedIdWithUser(long feedId);

    // user data, user의 statuses, category의 stat과 함께 조회
    @Query("select f from Feed f join fetch f.user u join fetch u.statuses join fetch f.category c join fetch c.stat where f.feedId=:feedId")
    Optional<Feed> findByFeedIdWithUserStatusesAndCategoryStat(long feedId);

    @Query("select f from Feed f join fetch f.category c join fetch c.stat where f.feedId=:feedId")
    Optional<Feed> findByFeedIdWithFeedCategoryStat(long feedId);

    @Query("SELECT f FROM Feed f WHERE f.category.categoryId = :categoryId AND f.user.nickname LIKE %:user% AND f.deleted = false ")
    Page<Feed> findByUserAndDeleted(@Param("categoryId")long categoryId, @Param("user") String user,  Pageable pageable);

    Page<Feed> findByCategoryCategoryIdAndFeedHashTagsHashTagHashTagId(long categoryId, long hashTagId, Pageable pageable);

    Page<Feed> findByCategoryCategoryIdAndDeletedIsFalseAndFeedHashTagsHashTagBodyContaining(long categoryId, String body, Pageable pageable);

    Page<Feed> findAllByCategoryCategoryIdAndBodyContainingAndDeletedIsFalse(long categoryId, String body, Pageable pageable);

    Page<Feed> findAllByDeletedIsFalse(Pageable pageable);

    Page<Feed> findAllByDeletedIsFalseAndCategoryCategoryId(long categoryId, Pageable pageable);

    List<Feed> findAllByUserUserIdAndDeletedIsFalse(long userId);

    Page<Feed> findAllByUserUserIdAndDeletedIsFalse(long userId, Pageable pageable);

    Page<Feed> findAllByUserUserIdAndCategoryCategoryIdAndDeletedIsFalse(long userId, long categoryId,Pageable pageable);

    // 일주일 안에 작성된 피드를 likes 의 사이즈 순으로 정렬해서 조회
    @Query(nativeQuery = true,
            value = "SELECT * FROM feed as f WHERE f.category_id=:categoryId and f.created_at>=:oneWeekAgo and f.deleted=false " +
                    "ORDER BY (SELECT  count(likes.feed_id) from likes where f.feed_id = likes.feed_id and likes.deleted=false) DESC")
//    @Query("select f from Feed f where f.createdAt>=:oneWeekAgo and f.category.categoryId=:categoryId and f.deleted=false order by (select count(l) from likes l where f.feedId = l.feed.feedId and l.deleted=false) desc")
    Page<Feed> findFeedsByCategoryAndCreatedAtAndSortLikes(
            Long categoryId,
            LocalDateTime oneWeekAgo,
            Pageable pageable
    );
}
