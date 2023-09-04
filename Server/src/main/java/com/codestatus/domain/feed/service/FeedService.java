package com.codestatus.domain.feed.service;

import com.codestatus.domain.comment.entity.Comment;
import com.codestatus.domain.comment.repository.CommentRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.feed.repository.FeedRepository;
import com.codestatus.global.service.BaseService;
import com.codestatus.domain.utils.CheckUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class FeedService implements BaseService<Feed> {

    private final FeedRepository feedRepository;

    private final CommentRepository commentRepository;

    public FeedService(FeedRepository feedRepository, CommentRepository commentRepository) {
        this.feedRepository = feedRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public void createEntity(Feed feed) { feedRepository.save(feed); }

    public void createFeed(Feed feed) {feedRepository.save(feed);}

    @Override
    public Feed findEntity(long id){return null;};

    //해당하는 카테고리 ID와 피드 ID로 삭제되지 않은 피드 하나 조회
    @Transactional(readOnly = true)
    public Feed findFeedByCategoryAndFeedId(long categoryId, long feedId){
        Optional<Feed> optionalFeed = feedRepository.findFeedByCategoryIdAndFeedIdAndDeletedIsFalse(categoryId, feedId);

        return optionalFeed.orElseThrow(()-> new BusinessLogicException(ExceptionCode.FEED_NOT_FOUND));}

    //일주일 안에 작성된 피드를 좋아요 순으로 정렬해서 조회
    @Transactional(readOnly = true)
    public Page<Feed> findWeeklyBestFeeds(int page, int size) {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);
        Sort sort = Sort.by(Sort.Direction.DESC, "likes"); // likes 내림차순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findByCreatedAtAfterAndDeletedIsFalseOrderByLikesDesc(oneWeekAgo, pageable);
    }

    //(검색기능)텍스트 받아서 해당하는 바디 가지고 있는 피드목록 조회
    @Transactional(readOnly = true)
    public Page<Feed> findFeedByBody(String text, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findByBodyAndDeletedIsFalse(text, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Feed> findAllFeedByCategory(long categoryId, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findAllFeedByCategory(categoryId, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Feed> findFeedByBodyAndCategory(long categoryId, String text, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findByCategoryAndBodyAndDeleted(categoryId, text, pageable);
    }

    //삭제되지않은 피드목록 조회
    @Transactional(readOnly = true)
    public Page<Feed> findAllFeedByDeleted(int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findAllByDeletedIsFalse(pageable);
    }

    //관리자 용 모든 피드 조회
    @Transactional(readOnly = true)
    public Page<Feed> findAllEntity(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return feedRepository.findAll(pageRequest);
    }

    // feed가 존재하는지, 요청한 유저와 리소스의 주인이 일치하는지 검사하고,
    // body값의 null 판별을 통해 수정
    @Override
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public void updateEntity(Feed feed, long userId){
        Feed findFeed = feedRepository.findVerifiedFeed(feed.getFeedId());
        CheckUser.isCreator(findFeed.getUser().getUserId(), userId);

        Optional.ofNullable(feed.getBody())
                .ifPresent(findFeed::setBody);

        feedRepository.save(findFeed);
    }

    //db에서 완전 삭제가 아닌 deleted=true 로 수정
    @Override
    public void deleteEntity(long feedId, long userId){
        Feed findFeed = feedRepository.findVerifiedFeed(feedId);
        CheckUser.isCreator(findFeed.getUser().getUserId(), userId);
        findFeed.setDeleted(true);
        feedRepository.save(findFeed);

        List<Comment> comments = findFeed.getComments();
        comments.forEach(comment -> comment.setDeleted(true));
        commentRepository.saveAll(comments);

    }
}
