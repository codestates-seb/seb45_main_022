package com.codestatus.domain.hashTag.mapper;

import com.codestatus.domain.hashTag.dto.HashTagResponseDto;
import com.codestatus.domain.hashTag.entity.HashTag;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface HashTagMapper {

    default List<HashTagResponseDto> hashTagsToHashTagResponseDtos(List<HashTag> hashTags){
        return hashTags.stream()
                .map(hashTag -> HashTagResponseDto
                        .builder()
                        .hashTagId(hashTag.getHashTagId())
                        .body(hashTag.getBody())
                        .build())
                .collect(Collectors.toList());
    }


}
