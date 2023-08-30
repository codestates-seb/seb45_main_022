package com.codestatus.domain.comment.service;

import com.codestatus.domain.comment.entity.Comment;
import com.codestatus.domain.comment.repository.CommentRepository;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.feed.mapper.FeedMapper;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.mapper.UserMapper;
import com.codestatus.global.service.BaseService;
import com.codestatus.global.utils.CheckUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class CommentService implements BaseService<Comment> {
    private final CommentRepository commentRepository;
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public void createEntity(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public Comment getEntity(Long entityId) {
        return null;
    }

    // comment가 존재하는지, 요청한 유저와 리소스의 주인이 일치하는지 검사하고,
    // body값의 null 판별을 통해 수정
    @Override
    public void updateEntity(Comment comment, Long userId) {
        Comment findComment = findVerifiedComment(comment.getCommentId());
        CheckUser.isCreator(findComment.getUser().getUserId(), userId);
        Optional.ofNullable(comment.getBody()).ifPresent(findComment::setBody);

        commentRepository.save(findComment);
    }

    // comment가 존재하는지, 요청한 유저와 리소스의 주인이 일치하는지 검사하고,
    // db에서 완전 삭제가 아닌 deleted=true 로 수정
    @Override
    public void deleteEntity(Long commentId, Long userId) {
        Comment findComment = findVerifiedComment(commentId);
        CheckUser.isCreator(findComment.getUser().getUserId(), userId);
        findComment.setDeleted(true);

        commentRepository.save(findComment);
    }

    // comment가 존재하는지 검사
    @Transactional(readOnly = true)
    public Comment findVerifiedComment(long commentId){
        Optional<Comment> optionalComment = commentRepository.findCommentByCommentIdAndDeleted(commentId, false);
        return optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
