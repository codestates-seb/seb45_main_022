package com.codestatus.comment.controller;

import com.codestatus.auth.dto.PrincipalDto;
import com.codestatus.comment.dto.CommentPostDto;
import com.codestatus.comment.dto.CommnetPatchDto;
import com.codestatus.comment.entity.Comment;
import com.codestatus.comment.mapper.CommentMapper;
import com.codestatus.comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Validated
@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PostMapping("/{feedId}")
    public ResponseEntity postComment(@PathVariable("feedId") long feedId,
                                      @Valid @RequestBody CommentPostDto requestBody,
                                      @AuthenticationPrincipal PrincipalDto principal) {
        Comment comment = commentMapper.commentPostDtoToComment(requestBody);
        commentService.createComment(feedId, principal.getId(), comment);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity patchComment(@PathVariable("commentId") long commentId,
                                       @Valid @RequestBody CommnetPatchDto requestBody,
                                       @AuthenticationPrincipal PrincipalDto principal){
        Comment comment = commentMapper.commentPatchDtoToComment(requestBody);
        commentService.updateComment(commentId, principal.getId(), comment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable("commentId") long commentId,
                                       @AuthenticationPrincipal PrincipalDto principal){
        commentService.deleteComment(commentId, principal.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
