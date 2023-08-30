package com.codestatus.global.service;

public interface BaseService<T> {
    void createEntity(T entity);
    T getEntity(Long entityId);
    void updateEntity(T updateEntity, Long userId);
    void deleteEntity(Long entityId, Long userId);
}
