package com.codestatus.domain.user.service;

import com.codestatus.domain.user.entity.User;

public interface LevelService {
    void gainExp(User user, int exp, int statId);
}
