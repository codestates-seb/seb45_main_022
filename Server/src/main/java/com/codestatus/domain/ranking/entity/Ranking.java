package com.codestatus.domain.ranking.entity;

import com.codestatus.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long rankingId;
    @Column
    private int ranks;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
