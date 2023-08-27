package com.codestatus.user.entity;

import com.codestatus.audit.Auditable;
import com.codestatus.status.Status;
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
@Entity(name = "user")
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickName;

    // 프로필 이미지 추가해야 함

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Status> statuses = new ArrayList<>();

    // 피드 매핑해야 함
    // 코멘트 매핑해야 함

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
