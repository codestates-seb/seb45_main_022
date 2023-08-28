package com.codestatus.image.entity;

import com.codestatus.feed.entity.Feed;
import com.codestatus.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @Column
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "feed_id", updatable = false)
    private Feed feed;

    @Column(nullable = false)
    private String imageURL;
}
