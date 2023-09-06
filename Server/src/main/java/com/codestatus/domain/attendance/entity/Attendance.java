package com.codestatus.domain.attendance.entity;

import com.codestatus.global.audit.Auditable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Attendance extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column
    private int statId;
}
