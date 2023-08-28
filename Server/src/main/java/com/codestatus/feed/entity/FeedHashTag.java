package com.codestatus.feed.entity;

import com.codestatus.hashtag.entity.HashTag;
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

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne
    @JoinColumn(name = "hashtag_id")
    private HashTag hashTag;

}
