package com.codestatus.ranking.entity;

import com.codestatus.user.entity.User;
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
    private int rank;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
