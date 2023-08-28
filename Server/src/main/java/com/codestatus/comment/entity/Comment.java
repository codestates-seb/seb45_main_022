package com.codestatus.comment.entity;

import com.codestatus.audit.Auditable;
import com.codestatus.feed.entity.Feed;
import com.codestatus.feed.entity.FeedHashTag;
import com.codestatus.user.entity.User;
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
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(nullable = false)
    private String body;

    @Column
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "feed_id", updatable = false)
    private Feed feed;


}
