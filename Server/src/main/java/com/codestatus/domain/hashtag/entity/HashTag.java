package com.codestatus.domain.hashtag.entity;

import com.codestatus.domain.feed.entity.FeedHashTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class HashTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hashTagId;

    @Column
    private int count;

    @Column
    private String body;

    @Column
    private boolean deleted = false;

    @OneToMany(mappedBy = "hashTag")
    private List<FeedHashTag> feedHashTags = new ArrayList<>();


}
