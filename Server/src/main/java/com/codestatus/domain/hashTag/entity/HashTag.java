package com.codestatus.domain.hashTag.entity;

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

    @OneToMany(mappedBy = "hashTag",cascade = CascadeType.REMOVE)
    private List<FeedHashTag> feedHashTags = new ArrayList<>();


}
