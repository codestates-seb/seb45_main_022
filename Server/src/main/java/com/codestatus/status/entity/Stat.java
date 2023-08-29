package com.codestatus.status.entity;

import com.codestatus.category.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Stat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statId;

    private String statName;

    @OneToMany(mappedBy = "stat")
    private List<Category> categories = new ArrayList<>();
}
