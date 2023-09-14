package com.codestatus.domain.feed.controller;

import com.codestatus.domain.feed.service.FeedService;
import com.codestatus.domain.hashTag.service.HashTagService;
import com.codestatus.domain.user.mapper.UserMapper;
import com.codestatus.global.auth.dto.PrincipalDto;
import com.codestatus.domain.category.mapper.CategoryMapper;
import com.codestatus.global.dto.MultiResponseDto;
import com.codestatus.domain.feed.dto.FeedPatchDto;
import com.codestatus.domain.feed.dto.FeedPostDto;
import com.codestatus.domain.feed.dto.FeedResponseDto;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.feed.mapper.FeedMapper;
import com.codestatus.domain.feed.service.FeedServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;
import java.util.Set;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/feed")
public class FeedController {

    private final FeedService feedService;
    private final HashTagService hashTagService;
    private final FeedMapper feedMapper;
    private final CategoryMapper categoryMapper;
    private final UserMapper userMapper;

    //선택한 카테고리에 피드 작성
    @PostMapping("/{categoryId}")
    public ResponseEntity postFeed(@PathVariable("categoryId") @Min(1) @Max(13) long categoryId,
                                   @Valid @RequestBody FeedPostDto requestBody,
                                   @AuthenticationPrincipal PrincipalDto principal) {
        Feed feed = feedMapper.feedPostDtoToFeed(
                categoryMapper.categoryIdToCategory(categoryId),
                requestBody,
                userMapper.userIdToUser(principal.getId())); //피드조립.
        feedService.createEntity(feed); //피드 생성
        hashTagService.createEntityByString(feed, requestBody.getHashTag()); //해쉬태그와 피드 연결

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //피드 상세 조회
    @GetMapping("/{feedId}")
    public ResponseEntity getFeedByCategory(@PathVariable("feedId") long feedId,
                                            @AuthenticationPrincipal PrincipalDto principalDto) {
        Feed feed = feedService.findEntity(feedId);
        boolean isLike = feedService.isLikeUser(feedId, principalDto.getId());

        FeedResponseDto feedResponseDto =
                feedMapper.feedToFeedResponseDto(feed, isLike);

        return new ResponseEntity<>(feedResponseDto, HttpStatus.OK);
    }

    //선택한 카테고리 내의 피드 전체 조회
    @GetMapping("/get/{categoryId}")
    public ResponseEntity getFeedsByCategory(@PathVariable @Min(0) @Max(13) long categoryId, @RequestParam int page, @RequestParam int size,
                                             @AuthenticationPrincipal PrincipalDto principal) {
        Page<Feed> pageFeeds = feedService.findAllFeedByCategory(categoryId, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();
        Set<Long> feedIds = feedService.isLikeFeedIds(feeds, principal);

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds, feedIds), pageFeeds), HttpStatus.OK);
    }

    //카테고리 구분없이 피드 전체 조회
    @GetMapping
    public ResponseEntity getFeeds(@RequestParam int page, @RequestParam int size,
                                   @AuthenticationPrincipal PrincipalDto principal) {
        Page<Feed> pageFeeds = feedService.findAllFeedByDeleted(page-1, size);
        List<Feed> feeds = pageFeeds.getContent();
        Set<Long> feedIds = feedService.isLikeFeedIds(feeds, principal);

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds, feedIds), pageFeeds), HttpStatus.OK);
    }

    //일주일 내에 작성된 피드목록 중에 삭제되지 않은 피드들을 좋아요 순으로 조회
    @GetMapping("/weeklybest/{categoryId}")
    public ResponseEntity getWeeklyBestFeeds(@PathVariable @Min(1) @Max(13) long categoryId, @RequestParam int page, @RequestParam int size,
                                             @AuthenticationPrincipal PrincipalDto principal) {
        Page<Feed> pageFeeds = feedService.findWeeklyBestFeeds(categoryId, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();
        Set<Long> feedIds = feedService.isLikeFeedIds(feeds, principal);

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds, feedIds), pageFeeds), HttpStatus.OK);
    }

    //카테고리 내 피드 본문 검색
    @GetMapping("/find/body/{categoryId}")
    public ResponseEntity getFeedsByBodyAndCategory(@PathVariable("categoryId") @Min(0) @Max(13) long categoryId,
                                                    @RequestParam int page,
                                                    @RequestParam int size,
                                                    @RequestParam String query,
                                                    @AuthenticationPrincipal PrincipalDto principal) {
        Page<Feed> pageFeeds = feedService.findFeedByBodyAndCategory(categoryId, query, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();
        Set<Long> feedIds = feedService.isLikeFeedIds(feeds, principal);

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds, feedIds), pageFeeds), HttpStatus.OK);
    }

    //카테고리 내 유저 닉네임으로 피드 검색
    @GetMapping("/find/user/{categoryId}")
    public ResponseEntity getFeedsByUserAndCategory(@PathVariable("categoryId") @Min(1) @Max(13) long categoryId,
                                                    @RequestParam int page,
                                                    @RequestParam int size,
                                                    @RequestParam String query,
                                                    @AuthenticationPrincipal PrincipalDto principal) {
        Page<Feed> pageFeeds = feedService.findFeedByUserAndCategory(categoryId, query, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();
        Set<Long> feedIds = feedService.isLikeFeedIds(feeds, principal);

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds, feedIds), pageFeeds), HttpStatus.OK);
    }
  
    //HashTagID로 검색
    @GetMapping("/find/hashTagId/{categoryId}")
    public ResponseEntity getFeedsByHashTagAndCategory(@PathVariable("categoryId") @Min(0) @Max(13) long categoryId,
                                                    @RequestParam int page,
                                                    @RequestParam int size,
                                                    @RequestParam long hashTagId,
                                                    @AuthenticationPrincipal PrincipalDto principal) {
        Page<Feed> pageFeeds = feedService.findFeedByHashTagAndCategory(categoryId, hashTagId, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();
        Set<Long> feedIds = feedService.isLikeFeedIds(feeds, principal);

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds, feedIds), pageFeeds), HttpStatus.OK);
    }

    // HashTagBody 로 검색
    @GetMapping("/find/hashTag/{categoryId}")
    public ResponseEntity getFeedsByHashTagBody(@PathVariable("categoryId") @Min(0) @Max(13) long categoryId,
                                                @RequestParam int page,
                                                @RequestParam int size,
                                                @RequestParam String body,
                                                @AuthenticationPrincipal PrincipalDto principal) {
        Page<Feed> pageFeeds = feedService.findFeedByHashTagBody(categoryId, body, page - 1, size);
        List<Feed> feeds = pageFeeds.getContent();
        Set<Long> feedIds = feedService.isLikeFeedIds(feeds, principal);

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds, feedIds), pageFeeds), HttpStatus.OK);
    }

    //피드 본문 수정
    @PatchMapping("/{feedId}")
    public ResponseEntity patchFeed(@PathVariable("feedId") int feedId,
                                    @Valid @RequestBody FeedPatchDto requestBody,
                                    @AuthenticationPrincipal PrincipalDto principal){
        Feed feed = feedMapper.feedPatchDtoToFeed(requestBody);
        feed.setFeedId(feedId);
        feedService.updateEntity(feed, principal.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로그인한 유저가 작성한 글 전체 조회
    @GetMapping("/my-post")
    public ResponseEntity myPost(@AuthenticationPrincipal PrincipalDto principal,
                                 @RequestParam int page,
                                 @RequestParam int size) {
        Page<Feed> pageFeeds = feedService.myPost(principal.getId(), page - 1, size);
        List<Feed> feeds = pageFeeds.getContent();
        Set<Long> feedIds = feedService.isLikeFeedIds(feeds, principal);

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds, feedIds), pageFeeds), HttpStatus.OK);
    }

    //피드 삭제(DB삭제아님)
    @DeleteMapping("/{feedId}")
    public ResponseEntity deleteFeed(@PathVariable("feedId") int feedId,
                                     @AuthenticationPrincipal PrincipalDto principal) {
        feedService.deleteEntity(feedId, principal.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
