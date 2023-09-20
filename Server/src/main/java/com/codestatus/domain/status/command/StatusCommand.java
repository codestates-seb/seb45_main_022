package com.codestatus.domain.status.command;

import com.codestatus.domain.status.entity.Stat;
import com.codestatus.domain.status.entity.Status;
import com.codestatus.domain.status.repository.StatusRepository;
import com.codestatus.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Transactional
public class StatusCommand {
    private final StatusRepository statusRepository;
    public void createStatus(User user) {
        List<Status> statusList = new ArrayList<>();
        for(int i = 1; i <= 5 ; i++) {
            Stat stat = new Stat();
            stat.setStatId((long) i);

            Status status = new Status();
            status.setUser(user);
            status.setStat(stat);
            status.setStatLevel(1);
            status.setStatExp(0);
            status.setRequiredExp(100); // 초기 필요 경험치 설정(level1 -> level2)
            statusList.add(status);
        }
        statusRepository.saveAll(statusList);
    }

    public void resetStatus(long userId) {
        List<Status> statusList = statusRepository.findAllByUserUserId(userId);
        for (Status status : statusList) {
            status.setStatLevel(1);
            status.setStatExp(0);
            status.setRequiredExp(100);
        }
        statusRepository.saveAll(statusList);
    }
}
