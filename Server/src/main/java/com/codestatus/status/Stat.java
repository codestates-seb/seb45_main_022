package com.codestatus.status;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToMany(mappedBy = "stat", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Status> statusList = new ArrayList<>();
}
