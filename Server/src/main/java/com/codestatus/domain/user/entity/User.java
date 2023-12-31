package com.codestatus.domain.user.entity;

import com.codestatus.global.audit.Auditable;
import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.status.entity.Status;
import com.codestatus.domain.like.entity.Like;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "users")
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @OneToMany(mappedBy = "user")
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Feed> feeds = new ArrayList<>();

    @Column(nullable = false)
    private String profileImage;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Status> statuses = new ArrayList<>();

    public User(String email) {
        this.email = email;
    }

    public enum UserStatus {
        USER_ACTIVE("활동중 유저"),
        USER_DELETE("탈퇴한 유저"),
        USER_BANNED("정지된 유저");

        @Getter
        private String userStatus;
        UserStatus(String userStatus) {
            this.userStatus = userStatus;
        }
    }
}
