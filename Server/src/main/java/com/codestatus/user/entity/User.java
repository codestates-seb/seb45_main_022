package com.codestatus.user.entity;

import com.codestatus.audit.Auditable;
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
    private String nickName;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status = UserStatus.USER_ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public User(String email) {
        this.email = email;
    }

    public enum UserStatus {
        USER_ACTIVE("활동중 유저"),
        USER_DELETE("탈퇴한 유저"),
        USER_BANNED("정지된 유저");

        @Getter
        private String status;
        UserStatus(String status) {
            this.status = status;
        }
    }
}
