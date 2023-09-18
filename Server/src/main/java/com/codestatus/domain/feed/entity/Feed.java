package com.codestatus.domain.feed.entity;

import com.codestatus.domain.hashTag.entity.FeedHashTag;
import com.codestatus.global.audit.Auditable;
import com.codestatus.domain.category.entity.Category;
import com.codestatus.domain.comment.entity.Comment;
import com.codestatus.domain.like.entity.Like;
import com.codestatus.domain.user.entity.User;
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
public class Feed extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long feedId;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private String data;

    @Column
    private boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", updatable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    @OneToMany(mappedBy = "feed")
    private List<FeedHashTag> feedHashTags = new ArrayList<>();

    @OneToMany(mappedBy = "feed")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "feed")
    private List<Like> likes = new ArrayList<>();
}
