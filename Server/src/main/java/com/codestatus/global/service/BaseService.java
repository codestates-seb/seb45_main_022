package com.codestatus.global.service;

public interface BaseService<T> {
    void createEntity(T entity);
    T findEntity(long entityId);
    void updateEntity(T updateEntity, long userId);
    void deleteEntity(long entityId, long userId);
}
