package com.codestatus.domain.like.entity;

import com.codestatus.global.audit.Auditable;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "likes")
@NoArgsConstructor
@Getter
@Setter
public class Like extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likeId;

    @Column
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "feed_id", updatable = false)
    private Feed feed;
}
