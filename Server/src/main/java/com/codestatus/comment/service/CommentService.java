package com.codestatus.comment.service;

import com.codestatus.comment.entity.Comment;
import com.codestatus.comment.repository.CommentRepository;
import com.codestatus.exception.BusinessLogicException;
import com.codestatus.exception.ExceptionCode;
import com.codestatus.feed.entity.Feed;
import com.codestatus.feed.mapper.FeedMapper;
import com.codestatus.user.entity.User;
import com.codestatus.user.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserMapper userMapper;
    private final FeedMapper feedMapper;
    public CommentService(CommentRepository commentRepository, UserMapper userMapper, FeedMapper feedMapper) {
        this.commentRepository = commentRepository;
        this.userMapper = userMapper;
        this.feedMapper = feedMapper;
    }

    public void createComment(long feedId, long userId, Comment comment){
        User user = userMapper.userIdToUser(userId);
        Feed feed = feedMapper.feedIdToFeed(feedId);
        comment.setUser(user);
        comment.setFeed(feed);

        commentRepository.save(comment);
    }

    public void updateComment(long commentId, long userId, Comment comment){
        Comment findComment = findVerifiedComment(commentId);
        checkUser(findComment, userId);
        Optional.ofNullable(comment.getBody()).ifPresent(findComment::setBody);

        commentRepository.save(comment);
    }

    public void deleteComment(long commentId, long userId) {
        Comment findComment = findVerifiedComment(commentId);
        checkUser(findComment, userId);
        findComment.setDeleted(true);

        commentRepository.save(findComment);
    }

    @Transactional(readOnly = true)
    public Comment findVerifiedComment(long commentId){
        Optional<Comment> optionalComment = commentRepository.findCommentByCommentIdAndDeleted(commentId, false);
        return optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    private void checkUser(Comment findComment, long userId){
        if (findComment.getUser().getUserId() != userId) throw new BusinessLogicException(ExceptionCode.FORBIDDEN_REQUEST);
    }
}
