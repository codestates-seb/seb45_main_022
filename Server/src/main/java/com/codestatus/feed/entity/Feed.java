package com.codestatus.feed.entity;

import com.codestatus.audit.Auditable;
import com.codestatus.category.entity.Category;
import com.codestatus.comment.entity.Comment;
import com.codestatus.hashtag.entity.HashTag;
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
public class Feed extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long feedId;

    @Column(nullable = false)
    private String body;

    @Column
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "category_id", updatable = false)
    private Category category;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    @ManyToMany(mappedBy = "hashTags")
    private List<HashTag> hashTags = new ArrayList<>();
//    @OneToMany(mappedBy = "feed")
//    private List<FeedHashTag> feedHashTags = new ArrayList<>();

    @OneToMany(mappedBy = "feed")
    private List<Comment> comments = new ArrayList<>();
}