package com.codestatus.domain.category.entity;


import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.status.entity.Stat;
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
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stat", updatable = false)
    private Stat stat;

    @Column
    private String category;

    @OneToMany(mappedBy = "category")
    private List<Feed> feeds = new ArrayList<>();

}
