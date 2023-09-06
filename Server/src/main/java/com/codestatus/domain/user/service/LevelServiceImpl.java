package com.codestatus.domain.user.service;

import com.codestatus.domain.user.entity.User;
import com.codestatus.domain.user.repository.ExpTableRepository;
import com.codestatus.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class LevelServiceImpl implements LevelService {
    private final UserRepository userRepository;
    private final ExpTableRepository expTableRepository;

    @Override
    public void gainExp(User user, int exp, int statId) {
        user.getStatuses().get(statId-1).setStatExp(
                user.getStatuses().get(statId-1).getStatExp() + exp
        );
        levelUpCheck(user, statId-1);
    }

    private void levelUpCheck(User user, int chosenStat) { // chooseStat: 1(str), 2(dex), 3(int), 4(charm), 5(vitality)
        int currentLevel = user.getStatuses().get(chosenStat).getStatLevel(); // 현재 레벨
        int currentExp = user.getStatuses().get(chosenStat).getStatExp(); // 현재 경험치
        int requiredExp = expTableRepository.findById((long) currentLevel).get().getRequired(); // 필요 경험치
        int maxLevel = 100; // 최대 레벨

        if (currentLevel >= maxLevel) { // 현재 레벨이 최대 레벨이라면 레벨업 불가
            return;
        }

        if (currentExp >= requiredExp) { // 현재 경험치가 필요 경험치보다 많다면 레벨업
            currentLevel += 1; // 레벨업
            user.getStatuses().get(chosenStat).setStatLevel(currentLevel); // 레벨 저장
            currentExp -= requiredExp; // 현재 경험치에서 필요 경험치 차감
            user.getStatuses().get(chosenStat).setStatExp(currentExp); // 경험치 차감
        }

        // 현재 레벨에서 다음 레벨까지 필요한 경험치 = 다음 레벨까지 필요한 경험치 - 현재 레벨까지 필요한 경험치
        int nextLevelRequiredExp = expTableRepository.findById((long) (currentLevel)).get().getRequired() - currentExp;
        user.getStatuses().get(chosenStat).setRequiredExp(nextLevelRequiredExp); // 다음 레벨까지 필요한 경험치 저장

        userRepository.save(user); // 유저 정보 저장
    }
}
