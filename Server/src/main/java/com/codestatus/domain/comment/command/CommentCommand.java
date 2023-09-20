package com.codestatus.domain.comment.command;

import com.codestatus.domain.comment.entity.Comment;
import com.codestatus.domain.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Component
public class CommentCommand {
    private final CommentRepository commentRepository;

    public void deleteCommentAll(long userId){
        List<Comment> commentList = commentRepository.findAllByUserUserIdAndDeletedIsFalse(userId);
        deleteCommentAll(commentList);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void deleteCommentAll(List<Comment> commentList){
        commentList.forEach(comment -> comment.setDeleted(true));

        commentRepository.saveAll(commentList);
    }
}
