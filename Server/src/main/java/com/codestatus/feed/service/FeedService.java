package com.codestatus.feed.service;

import com.codestatus.comment.entity.Comment;
import com.codestatus.comment.repository.CommentRepository;
import com.codestatus.exception.BusinessLogicException;
import com.codestatus.exception.ExceptionCode;
import com.codestatus.feed.entity.Feed;
import com.codestatus.feed.mapper.FeedMapper;
import com.codestatus.feed.repository.FeedRepository;
import com.codestatus.user.entity.User;
import com.codestatus.user.mapper.UserMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class FeedService {

    private final FeedRepository feedRepository;

    private final FeedMapper feedMapper;

    private final UserMapper userMapper;

    private final CommentRepository commentRepository;

    public FeedService(FeedRepository feedRepository, FeedMapper feedMapper, UserMapper userMapper, CommentRepository commentRepository) {
        this.feedRepository = feedRepository;
        this.feedMapper = feedMapper;
        this.userMapper = userMapper;
        this.commentRepository = commentRepository;
    }

    public Feed createFeed(Feed feed, long id) {
        User user = userMapper.userIdToUser(id);
        feed.setUser(user);

        return feedRepository.save(feed);
    }

    @Transactional(readOnly = true)
    public Feed findFeedByDeleted(long feedId, boolean deleted){
        Optional<Feed> optionalFeed = feedRepository.findByFeedIdAndDeleted(feedId, deleted);
        if(deleted) {
            throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);
        }
        return optionalFeed.orElseThrow(()-> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Page<Feed> findFeedByBodyAndDeleted(String text, boolean deleted, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findByBodyAndDeleted(text, deleted, pageable);
    }
//    @Transactional(readOnly = true)
//    public Page<Feed> findFeedByUserAndDeleted(String text, boolean deleted, int page, int size) {
//        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
//        Pageable pageable = PageRequest.of(page, size, sort);
//        return feedRepository.findByUserAndDeleted(text, deleted, pageable);
//    }
//    @Transactional(readOnly = true)
//    public Page<Feed> findFeedByHashTagAndDeleted(String text, boolean deleted, int page, int size) {
//        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
//        Pageable pageable = PageRequest.of(page, size, sort);
//        return feedRepository.findByHashTagAndDeleted(text, deleted, pageable);
//    }

    @Transactional(readOnly = true)
    public Feed findFeed(long feedId){
        Optional<Feed> optionalFeed = feedRepository.findById(feedId);
        return optionalFeed.orElseThrow(()-> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Page<Feed> findAllFeed(boolean deleted, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); //최신순 정렬
        Pageable pageable = PageRequest.of(page, size, sort);
        return feedRepository.findAllByDeleted(deleted, pageable);
    }

    //관리자 용
    @Transactional(readOnly = true)
    public Page<Feed> findAllFeed(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return feedRepository.findAll(pageRequest);
    }


    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Feed updateFeed(Feed feed, long userId){
        Feed modifiedFeed = findFeed(feed.getFeedId());
        if (modifiedFeed.getUser().getUserId() != userId) throw new BusinessLogicException(ExceptionCode.BOARD_NOT_EDITABLE);

        Optional.ofNullable(feed.getBody())
                .ifPresent(body -> modifiedFeed.setBody(body));

        return feedRepository.save(modifiedFeed);
    }

    public void deleteFeed(long feedId, long userId){
        Feed feed = findFeed(feedId);
        if (feed.getUser().getUserId() != userId) throw new BusinessLogicException(ExceptionCode.NOT_RESOURCE_OWNER);
        feed.setDeleted(true);
        feedRepository.save(feed);

        List<Comment> comments = feed.getComments();
        comments.forEach(comment -> comment.setDeleted(true));
        commentRepository.saveAll(comments);

    }

}
