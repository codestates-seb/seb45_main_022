package com.codestatus.domain.feed.controller;

import com.codestatus.domain.user.mapper.UserMapper;
import com.codestatus.global.auth.dto.PrincipalDto;
import com.codestatus.domain.category.mapper.CategoryMapper;
import com.codestatus.global.dto.MultiResponseDto;
import com.codestatus.domain.feed.dto.FeedPatchDto;
import com.codestatus.domain.feed.dto.FeedPostDto;
import com.codestatus.domain.feed.dto.FeedResponseDto;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.feed.mapper.FeedMapper;
import com.codestatus.domain.feed.service.FeedService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/feed")
public class FeedController {

    private final FeedService feedService;

    private final FeedMapper feedMapper;

    private final CategoryMapper categoryMapper;

    private final UserMapper userMapper;


    public FeedController(FeedService feedService, FeedMapper feedMapper, CategoryMapper categoryMapper, UserMapper userMapper) {
        this.feedService = feedService;
        this.feedMapper = feedMapper;
        this.categoryMapper = categoryMapper;
        this.userMapper = userMapper;
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity postFeed(@PathVariable("categoryId") long categoryId,
                                   @RequestBody FeedPostDto requstBody,
                                   @AuthenticationPrincipal PrincipalDto principal) {
        Feed feed = feedMapper.feedPostDtoToFeed(requstBody);
        feed.setCategory(categoryMapper.categoryIdToCategory(categoryId));
        feed.setUser((userMapper.userIdToUser(principal.getId())));
        feedService.createEntity(feed);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{feedId}")
    public ResponseEntity getFeed(@PathVariable("feedId") long feedId, boolean deleted) {
        Feed feed = feedService.findFeedByDeleted(feedId, deleted);

        FeedResponseDto feedResponseDto =
                feedMapper.feedToFeedResponseDto(feed);

        return new ResponseEntity<>(feedResponseDto, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getFeedsBytext(@RequestParam int page, @RequestParam int size) {
        Page<Feed> pageFeeds = feedService.findAllFeed(false, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity getFeedsBytext(@RequestParam int page,
                                         @RequestParam int size,
                                         @RequestParam String query) {
        Page<Feed> pageFeeds = feedService.findFeedByBodyAndDeleted(query,false, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }


    @PatchMapping("/{feedId}")
    public ResponseEntity patchFeed(@PathVariable("feedId") int feedId,
                                    @RequestBody FeedPatchDto requestBody,
                                    @AuthenticationPrincipal PrincipalDto principal){
        Feed feed = feedMapper.feedPatchDtoToFeed(requestBody);
        feed.setFeedId(feedId);
        feedService.updateFeed(feed, principal.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{feedId}")
    public ResponseEntity deleteFeed(@PathVariable("feedId") int feedId,
                                     @AuthenticationPrincipal PrincipalDto principal) {
        feedService.deleteFeed(feedId, principal.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }








}
