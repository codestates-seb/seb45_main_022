package com.codestatus.domain.like.controller;

import com.codestatus.global.auth.dto.PrincipalDto;
import com.codestatus.domain.like.service.LikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/feed/like")
@RestController
public class LikeController {
    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{feedId}")
    public ResponseEntity likeOrDislikeFeed(@PathVariable("feedId") long feedId,
                                            @AuthenticationPrincipal PrincipalDto principal) {
        likeService.feedLikeOrDisLike(feedId, principal.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
