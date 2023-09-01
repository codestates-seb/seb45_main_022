package com.codestatus.global.service;

import org.springframework.stereotype.Service;

@Service
public interface BaseService<T> {
    void createEntity(T entity);
    T findEntity(long entityId);
    void updateEntity(T updateEntity, long userId);
    void deleteEntity(long entityId, long userId);
}
