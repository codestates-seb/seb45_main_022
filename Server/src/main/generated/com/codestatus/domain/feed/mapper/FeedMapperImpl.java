package com.codestatus.domain.feed.mapper;

import com.codestatus.domain.feed.dto.FeedPatchDto;
import com.codestatus.domain.feed.entity.Feed;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-31T19:54:13+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class FeedMapperImpl implements FeedMapper {

    @Override
    public Feed feedPatchDtoToFeed(FeedPatchDto feedPatchDto) {
        if ( feedPatchDto == null ) {
            return null;
        }

        Feed feed = new Feed();

        feed.setBody( feedPatchDto.getBody() );

        return feed;
    }
}
