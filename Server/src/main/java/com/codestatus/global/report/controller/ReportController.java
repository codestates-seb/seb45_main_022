package com.codestatus.global.report.controller;

import com.codestatus.domain.feed.mapper.FeedMapper;
import com.codestatus.domain.user.mapper.UserMapper;
import com.codestatus.global.auth.dto.PrincipalDto;
import com.codestatus.global.report.service.ReportFeedServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/report")
public class ReportController {
    private final ReportFeedServiceImpl reportFeedService;
    private final UserMapper userMapper;
    private final FeedMapper feedMapper;

    @PostMapping("/feed/{feedId}")
    public ResponseEntity reportFeed(@PathVariable("feedId") long feedId, @AuthenticationPrincipal PrincipalDto principal) {
        reportFeedService.report(
                feedMapper.feedIdToFeed(feedId),
                userMapper.userIdToUser(principal.getId())
        );
        return new ResponseEntity(HttpStatus.OK);
    }
}
