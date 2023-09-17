package com.codestatus.domain.comment.controller;

import com.codestatus.domain.comment.service.CommentService;
import com.codestatus.domain.feed.mapper.FeedMapper;
import com.codestatus.domain.feed.service.FeedService;
import com.codestatus.domain.user.mapper.UserMapper;
import com.codestatus.global.auth.dto.PrincipalDto;
import com.codestatus.domain.comment.dto.CommentPostDto;
import com.codestatus.domain.comment.dto.CommnetPatchDto;
import com.codestatus.domain.comment.entity.Comment;
import com.codestatus.domain.comment.mapper.CommentMapper;
import com.codestatus.global.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;
    private final FeedService feedService;

    private final CommentMapper commentMapper;
    private final UserMapper userMapper;
    private final FeedMapper feedMapper;

    @PostMapping("/{feedId}")
    public ResponseEntity postComment(@PathVariable("feedId") long feedId,
                                      @Valid @RequestBody CommentPostDto requestBody,
                                      @AuthenticationPrincipal PrincipalDto principal) {
        Comment comment = commentMapper.commentPostDtoToComment(
                requestBody,
                feedMapper.feedIdToFeed(feedId),
                userMapper.userIdToUser(principal.getId()));

        commentService.createEntity(comment);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{feedId}")
    public ResponseEntity getComment(@PathVariable("feedId") long feedId,
                                     @RequestParam int page, @RequestParam int size) {
        Page<Comment> pageComments = commentService.getEntitys(feedId, page-1, size);
        int statId = feedService.getStatId(feedId);

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        commentMapper.commentToCommentResponseDto(
                                pageComments.getContent(), statId), pageComments
                ), HttpStatus.OK);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity patchComment(@PathVariable("commentId") long commentId,
                                       @Valid @RequestBody CommnetPatchDto requestBody,
                                       @AuthenticationPrincipal PrincipalDto principal){
        Comment comment = commentMapper.commentPatchDtoToComment(requestBody, commentId);

        commentService.updateEntity(comment, principal.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable("commentId") long commentId,
                                       @AuthenticationPrincipal PrincipalDto principal){
        commentService.deleteEntity(commentId, principal.getId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
