package com.codestatus.feed.controller;

import com.codestatus.dto.MultiResponseDto;
import com.codestatus.feed.dto.FeedPatchDto;
import com.codestatus.feed.dto.FeedPostDto;
import com.codestatus.feed.dto.FeedResponseDto;
import com.codestatus.feed.entity.Feed;
import com.codestatus.feed.mapper.FeedMapper;
import com.codestatus.feed.service.FeedService;
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


    public FeedController(FeedService feedService, FeedMapper feedMapper) {
        this.feedService = feedService;
        this.feedMapper = feedMapper;
    }

    @PostMapping
    public ResponseEntity postFeed(@RequestBody FeedPostDto requstBody, @AuthenticationPrincipal long userId) {
        Feed feed = feedMapper.feedPostDtoToFeed(requstBody);
        feedService.createFeed(feed, userId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity getFeed(@PathVariable("id") long feedId, boolean deleted) {
        Feed feed = feedService.findFeedByDeleted(feedId, deleted);

        FeedResponseDto feedResponseDto =
                feedMapper.feedToFeedResponseDto(feed);

        return new ResponseEntity<>(feedResponseDto, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity getFeedsBytext(@RequestParam int page, @RequestParam int size, @RequestParam String query) {
        Page<Feed> pageFeeds = feedService.findFeedByBodyAndDeleted(query,false, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }


    @PatchMapping("/{id}")
    public ResponseEntity patchFeed(@PathVariable("id") int id, @RequestBody FeedPatchDto requestBody, @AuthenticationPrincipal long userId){
        Feed feed = feedMapper.feedPatchDtoToFeed(requestBody);
        feed.setFeedId(id);
        feedService.updateFeed(feed, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteFeed(@PathVariable("id") int feedId, @AuthenticationPrincipal long userId) {
        feedService.deleteFeed(feedId, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }








}
