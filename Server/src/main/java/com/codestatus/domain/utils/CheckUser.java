package com.codestatus.domain.utils;

import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;

public class CheckUser {
    public static void isCreator(long entityUserId, long userId){
        if (entityUserId != userId) throw new BusinessLogicException(ExceptionCode.FORBIDDEN_REQUEST);
    }
}
