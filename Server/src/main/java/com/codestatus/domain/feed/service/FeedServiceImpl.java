package com.codestatus.domain.feed.service;

import com.codestatus.domain.comment.command.CommentCommand;
import com.codestatus.domain.feed.command.FeedCommand;
import com.codestatus.domain.hashTag.command.FeedHashTagCommand;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.feed.repository.FeedRepository;
import com.codestatus.domain.like.likeCommand.LikeCommand;
import com.codestatus.global.auth.dto.PrincipalDto;
import com.codestatus.global.utils.CheckUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {
    private final FeedRepository feedRepository;

    private final FeedCommand feedCommand;
    private final FeedHashTagCommand feedHashTagCommand;
    private final CommentCommand commentCommand;
    private final LikeCommand likeCommand;

    @Override
    public void createEntity(Feed feed) {
        feedRepository.save(feed);
    }

    @Override
    public Feed findEntity(long feedId) {
        return feedCommand.findVerifiedFeed(feedId);
    }

    public boolean isLikeUser(long feedId, long userId) {
        return likeCommand.checkIsLikeUser(feedId, userId);
    }

    //피드리스트에서 유저가 좋아요한 피드 아이디셋
    public Set<Long> isLikeFeedIds(List<Feed> feeds, PrincipalDto principal) {
        if(principal == null){
            return Collections.emptySet();
        }
        Set<Long> likedFeedIds = feedRepository
                .findFeedsLikedByUserInList(principal.getId(), feeds)
                .stream()
                .map(Feed::getFeedId)
                .collect(Collectors.toSet());
        return likedFeedIds;
    }

    //카테고리 내 피드리스트 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Feed> findAllFeedByCategory(long categoryId, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findAllByDeletedIsFalseAndCategoryCategoryId(categoryId, pageable);
    }

    //일주일 안에 작성된 피드를 좋아요 순으로 정렬해서 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Feed> findWeeklyBestFeeds(long categoryId, int page, int size) {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);
        Sort sort = Sort.by(Sort.Direction.DESC, "created_at"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findFeedsByCategoryAndCreatedAtAndSortLikes(categoryId, oneWeekAgo, pageable);
    }

    //(검색기능)텍스트 받아서 해당 카테고리 내에서 해당하는 바디 가지고 있는 피드목록 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Feed> findFeedByBodyAndCategory(long categoryId, String text, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findAllByCategoryCategoryIdAndBodyContainingAndDeletedIsFalse(categoryId, text, pageable);
    }

    //(검색기능)텍스트 받아서 해당 카테고리 내에서 해당하는 유저가 쓴 피드목록 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Feed> findFeedByUserAndCategory(long categoryId, String text, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findByUserAndDeleted(categoryId, text, pageable);
    }

    //(검색기능)텍스트 받아서 해당 카테고리 내에서 해당하는 해쉬태그 가지고 있는 피드목록 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Feed> findFeedByHashTagAndCategory(long categoryId, long hashTagId, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findByCategoryCategoryIdAndFeedHashTagsHashTagHashTagId(categoryId, hashTagId, pageable);
    }

    // hashTag Body 로 feed 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Feed> findFeedByHashTagBody(long categoryId, String body, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findByCategoryCategoryIdAndDeletedIsFalseAndFeedHashTagsHashTagBodyContaining(categoryId, body, pageable);
    }

    //삭제되지않은 피드목록 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Feed> findAllFeedByDeleted(int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findAllByDeletedIsFalse(pageable);
    }

    //관리자 용 모든 피드 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Feed> findAllEntity(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return feedRepository.findAll(pageRequest);
    }

    // feed가 존재하는지, 요청한 유저와 리소스의 주인이 일치하는지 검사하고,
    // body값의 null 판별을 통해 수정
    @Override
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public void updateEntity(Feed feed, long userId) {
        Feed findFeed = feedCommand.findVerifiedFeed(feed.getFeedId());
        CheckUser.isCreator(findFeed.getUser().getUserId(), userId);

        Optional.ofNullable(feed.getBody())
                .ifPresent(findFeed::setBody);
        Optional.ofNullable(feed.getData())
                .ifPresent(findFeed::setData);

        feedRepository.save(findFeed);
    }

    // 로그인한 유저가 작성한 피드 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Feed> myPost(long userId, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findAllByUserUserIdAndDeletedIsFalse(userId, pageable);
    }

    //db에서 완전 삭제가 아닌 deleted=true 로 수정
    @Override
    public void deleteEntity(long feedId, long userId) {
        Feed findFeed = feedCommand.findVerifiedFeed(feedId);
        CheckUser.isCreator(findFeed.getUser().getUserId(), userId);
        findFeed.setDeleted(true);
        feedRepository.save(findFeed);

        commentCommand.deleteCommentAll(findFeed.getComments());
        feedHashTagCommand.deleteFeedHashtagAll(findFeed.getFeedHashTags());
    }
}
