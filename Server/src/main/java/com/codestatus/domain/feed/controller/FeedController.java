package com.codestatus.domain.feed.controller;

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
import com.codestatus.domain.feed.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.util.List;

@Validated
@RestController
@RequestMapping("/feed")
public class FeedController {
    @Autowired
    private EntityManager entityManager;

    private final FeedService feedService;

    private final HashTagService hashTagService;

    private final FeedMapper feedMapper;

    private final CategoryMapper categoryMapper;

    private final UserMapper userMapper;


    public FeedController(FeedService feedService, HashTagService hashTagService, FeedMapper feedMapper, CategoryMapper categoryMapper, UserMapper userMapper) {
        this.feedService = feedService;
        this.hashTagService = hashTagService;
        this.feedMapper = feedMapper;
        this.categoryMapper = categoryMapper;
        this.userMapper = userMapper;
    }

    //해당하는 카테고리에 피드 작성
    @Transactional
    @PostMapping("/{categoryId}")
    public ResponseEntity postFeed(@PathVariable("categoryId") long categoryId,
                                   @RequestBody FeedPostDto requstBody,
                                   @AuthenticationPrincipal PrincipalDto principal) {
        Feed feed = feedMapper.feedPostDtoToFeed(requstBody);  //dto를 엔티티로 변환
        feed.setCategory(categoryMapper.categoryIdToCategory(categoryId)); //피드에 카테고리 세팅
        feed.setUser((userMapper.userIdToUser(principal.getId()))); //피드에 유저 세팅

        entityManager.persist(feed); //영속성 컨텍스트로

        List<String> hashTags = requstBody.getHashTag();// String으로 검색하기 위해 생성
        feed.setFeedHashTags(hashTagService.createEntityByString(feed, hashTags));  //피드에 새 해쉬태그리스트 세팅
        feedService.createEntity(feed); //피드 생성
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //해당하는 피드아이디의 피드 조회
    @GetMapping("/{categoryId}/{feedId}")
    public ResponseEntity getFeedByCategory(@PathVariable("categoryId") long categoryId,
                                            @PathVariable("feedId") long feedId) {
        Feed feed = feedService.findFeedByCategoryAndFeedId(categoryId, feedId);

        FeedResponseDto feedResponseDto =
                feedMapper.feedToFeedResponseDto(feed);

        return new ResponseEntity<>(feedResponseDto, HttpStatus.OK);
    }

    //해당 카테고리 내의 피드목록 조회
    @GetMapping("/{categoryId}")
    public ResponseEntity getFeedsByCategory(@PathVariable("categoryId") long categoryId, @RequestParam int page, @RequestParam int size) {
        Page<Feed> pageFeeds = feedService.findAllFeedByCategory(categoryId, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }

    //카테고리 구분없이 피드목록 조회
    @GetMapping
    public ResponseEntity getFeeds(@RequestParam int page, @RequestParam int size) {
        Page<Feed> pageFeeds = feedService.findAllFeedByDeleted(page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }

    //일주일 내에 작성된 피드목록 중에 삭제되지 않은 피드들을 좋아요 순으로 조회
    @GetMapping("/weeklybest")
    public ResponseEntity getWeeklyBestFeeds(@RequestParam int page, @RequestParam int size) {
        Page<Feed> pageFeeds = feedService.findWeeklyBestFeeds(page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }

    //쿼리를 바디로 검색하여 피드목록 조회
    @GetMapping("/find")
    public ResponseEntity getFeedsBybody(@RequestParam int page,
                                         @RequestParam int size,
                                         @RequestParam String query) {
        Page<Feed> pageFeeds = feedService.findFeedByBody(query, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }

    //해당하는 카테고리 내에서 쿼리를 바디로 검색하여 피드목록 조회
    @GetMapping("/find/{categoryId}")
    public ResponseEntity getFeedsByBodyAndCategory(@PathVariable("categoryId") long categoryId,
                                                    @RequestParam int page,
                                         @RequestParam int size,
                                         @RequestParam String query) {
        Page<Feed> pageFeeds = feedService.findFeedByBodyAndCategory(categoryId, query, page-1, size);
        List<Feed> feeds = pageFeeds.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        feedMapper.feedsToFeedResponseDtos(feeds), pageFeeds), HttpStatus.OK);
    }



    //피드아이디로 조회하여 피드 바디 수정
    @PatchMapping("/{feedId}")
    public ResponseEntity patchFeed(@PathVariable("feedId") int feedId,
                                    @RequestBody FeedPatchDto requestBody,
                                    @AuthenticationPrincipal PrincipalDto principal){
        Feed feed = feedMapper.feedPatchDtoToFeed(requestBody);
        feed.setFeedId(feedId);
        feedService.updateEntity(feed, principal.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //피드 아이디로 조회하여 피드 바디 삭제(DB삭제아님)
    @DeleteMapping("/{feedId}")
    public ResponseEntity deleteFeed(@PathVariable("feedId") int feedId,
                                     @AuthenticationPrincipal PrincipalDto principal) {
        feedService.deleteEntity(feedId, principal.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
