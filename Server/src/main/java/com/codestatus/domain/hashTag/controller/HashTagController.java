package com.codestatus.domain.hashTag.controller;

import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.hashTag.entity.HashTag;
import com.codestatus.domain.hashTag.mapper.HashTagMapper;
import com.codestatus.domain.hashTag.service.HashTagServiceImpl;
import com.codestatus.global.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/hashTag")
public class HashTagController {

    private final HashTagServiceImpl hashTagServiceImpl;

    private final HashTagMapper hashTagMapper;

    @GetMapping("/find")
    public ResponseEntity getHashTagsBybody(@RequestParam int page,
                                         @RequestParam int size,
                                         @RequestParam String query) {
        Page<HashTag> pageHashTags = hashTagServiceImpl.findHashTagByBody(query, page-1, size);
        List<HashTag> hashTags = pageHashTags.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        hashTagMapper.hashTagsToHashTagResponseDtos(hashTags), pageHashTags), HttpStatus.OK);
    }
}
