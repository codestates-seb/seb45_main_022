package com.codestatus.domain.status.service;

import com.codestatus.domain.status.entity.Stat;
import com.codestatus.domain.status.repository.StatRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true)
@Service
public class StatService {
    private final StatRepository statRepository;

    public StatService(StatRepository statRepository) {
        this.statRepository = statRepository;
    }

    public Stat findStat(long statId){
        Optional<Stat> optionalStat = statRepository.findById(statId);
        return optionalStat.orElseThrow(() -> new BusinessLogicException(ExceptionCode.STAT_NOT_FOUND));
    }
}
