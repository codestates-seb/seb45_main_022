package com.codestatus.global.utils;

import com.codestatus.domain.user.entity.Exp;
import com.codestatus.domain.user.repository.ExpTableRepository;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

//@Component
// @EnableScheduling
public class ExpTableGenerator {
//    private final ExpTableRepository;
//
//    public ExpTableGenerator(ExpTableRepository expTableRepository) {
//        this.expTableRepository = expTableRepository;
//    }
//
//    // @Scheduled(initialDelay = 60000, fixedDelay = Long.MAX_VALUE)
//    public void expTable () {
//        int baseExp = 100;
//        int maxLevel = 100;
//        double expRate = 1.11;
//        int[] expList = new int[maxLevel];
//        expList[0] = baseExp;
//        for (int i = 1; i < maxLevel; i++) {
//            expList[i] = (int) (expList[i - 1] * expRate);
//        }
//
//        // DB에 저장
//        for (int i = 0; i < maxLevel; i++) {
//            Exp exp = new Exp();
//            exp.setRequired(expList[i]);
//            expTableRepository.save(exp);
//        }
//    }
}