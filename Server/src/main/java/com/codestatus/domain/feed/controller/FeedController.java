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

    //해당하는 카테고리에 피드 작성
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

    //해당하는 피드아이디의 피드 조회(삭제여부에 따라)
    @GetMapping("/{feedId}")
    public ResponseEntity getFeed(@PathVariable("feedId") long feedId, boolean deleted) {
        Feed feed = feedService.findFeedByDeleted(feedId, deleted);

        FeedResponseDto feedResponseDto =
                feedMapper.feedToFeedResponseDto(feed);

        return new ResponseEntity<>(feedResponseDto, HttpStatus.OK);
    }

    //피드목록 조회
    @GetMapping
    public ResponseEntity getFeeds(@RequestParam int page, @RequestParam int size) {
        Page<Feed> pageFeeds = feedService.findAllEntityByDeleted(false, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }

    //일주일 내에 작성된 피드목록 중에 삭제되지 않은 피드들을 좋아요 순으로 조회
    @GetMapping("/weeklybest")
    public ResponseEntity getWeeklyBestFeeds(@RequestParam int page, @RequestParam int size) {
        Page<Feed> pageFeeds = feedService.findWeeklyBestFeeds(false, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }

    //해당하는 쿼리를 바디로 검색하여 해당하는 피드목록 조회
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

    //해당하는 피드아이디의 피드 바디 수정
    @PatchMapping("/{feedId}")
    public ResponseEntity patchFeed(@PathVariable("feedId") int feedId,
                                    @RequestBody FeedPatchDto requestBody,
                                    @AuthenticationPrincipal PrincipalDto principal){
        Feed feed = feedMapper.feedPatchDtoToFeed(requestBody);
        feed.setFeedId(feedId);
        feedService.updateEntity(feed, principal.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //해당하는 피드아이디의 피드 바디 수정
    @DeleteMapping("/{feedId}")
    public ResponseEntity deleteFeed(@PathVariable("feedId") int feedId,
                                     @AuthenticationPrincipal PrincipalDto principal) {
        feedService.deleteEntity(feedId, principal.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
