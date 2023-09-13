package com.codestatus.domain.status.service;

import com.codestatus.domain.status.entity.Stat;
import com.codestatus.domain.status.repository.StatRepository;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class StatServiceImpl implements StatService {
    private final StatRepository statRepository;

    @Override
    public Stat findStat(long statId){
        Optional<Stat> optionalStat = statRepository.findById(statId);
        return optionalStat.orElseThrow(() -> new BusinessLogicException(ExceptionCode.STAT_NOT_FOUND));
    }
}
