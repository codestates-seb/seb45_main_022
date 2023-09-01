package com.codestatus.domain.hashTag.service;

import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.hashTag.entity.FeedHashTag;
import com.codestatus.domain.hashTag.entity.HashTag;
import com.codestatus.domain.hashTag.repository.FeedHashTagRepository;
import com.codestatus.domain.hashTag.repository.HashTagRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import com.codestatus.global.service.BaseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class HashTagService implements BaseService<HashTag> {

    private final HashTagRepository hashTagRepository;

    private final FeedHashTagRepository feedHashTagRepository;

    public HashTagService(HashTagRepository hashTagRepository, FeedHashTagRepository feedHashTagRepository) {
        this.hashTagRepository = hashTagRepository;
        this.feedHashTagRepository = feedHashTagRepository;
    }

    //해쉬태그 생성
    @Override
    public void createEntity(HashTag hashTag) {
        hashTagRepository.save(hashTag);
    }

    public List<FeedHashTag> createEntityByString(Feed feed, List<String> hashTags) {
        List<FeedHashTag> feedHashTags = new ArrayList<>();  //기존에 없던 HashTag를 넣어주기 위해 임시 리스트 생성
        for (String hashTagStr : hashTags) {  //리스트 내의 해쉬태그를 하나씩 확인
            HashTag hashTag = findOrCreateHashTag(hashTagStr); //하나씩 받아서 객체로 생성
            FeedHashTag feedHashTag = new FeedHashTag(feed, hashTag);
            feedHashTags.add(feedHashTag); //생성한 해쉬태그를 임시 리스트에 추가.
            feedHashTagRepository.save(feedHashTag); // 피드해쉬태그 저장.
        }
        return feedHashTags;
    }

    public HashTag findOrCreateHashTag(String hashTagStr) {
        Optional<HashTag> optionalHashTag = Optional.ofNullable(findByString(hashTagStr));

        if (optionalHashTag.isPresent()) {
            return optionalHashTag.get(); // 이미 존재하는 해시태그 반환
        } else {
            HashTag newHashTag = new HashTag();
            newHashTag.setBody(hashTagStr);
            newHashTag.setCount(0);
            newHashTag.setDeleted(false);

            hashTagRepository.save(newHashTag); // 새로운 해시태그 저장
            return newHashTag;
        }
    }

    //해쉬태그 조회
    @Override
    public HashTag findEntity(long entityId) {
        Optional<HashTag> optionalHashTag = hashTagRepository.findById(entityId);

        return optionalHashTag.orElseThrow(() -> new BusinessLogicException(ExceptionCode.HASHTAG_NOT_FOUND));
    }


    public HashTag findByString(String hashTag) {
        Optional<HashTag> optionalHashTag = hashTagRepository.findHashTagByBody(hashTag);

        return optionalHashTag.orElse(null);
    }

    @Override
    public void updateEntity(HashTag updateEntity, long userId) {

    }

    @Override
    public void deleteEntity(long entityId, long userId) {

    }
}

