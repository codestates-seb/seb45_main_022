package com.codestatus.domain.status.controller;

import com.codestatus.domain.status.dto.StatResponseDto;
import com.codestatus.domain.status.entity.Stat;
import com.codestatus.domain.status.mapper.StatMapper;
import com.codestatus.domain.status.service.StatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/stat")
public class StatController {
    private final StatService statService;
    private final StatMapper statMapper;

    @GetMapping("/{statId}")
    public ResponseEntity getStatCategory(@PathVariable("statId")@Min(1)@Max(5) long statId) {
        Stat stat = statService.findStat(statId);
        StatResponseDto statResponseDto = statMapper.statToStatResponseDto(stat);
        return new ResponseEntity<>(statResponseDto, HttpStatus.OK);
    }
}
