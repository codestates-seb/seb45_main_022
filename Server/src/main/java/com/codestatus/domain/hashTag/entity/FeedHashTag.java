package com.codestatus.domain.hashTag.entity;

import com.codestatus.domain.feed.entity.Feed;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "feed_hashTag")
public class FeedHashTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long feedHashTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtag_id")
    private HashTag hashTag;

    public FeedHashTag(Feed feed, HashTag hashTag) {
        this.feed = feed;
        this.hashTag = hashTag;
    }

}
