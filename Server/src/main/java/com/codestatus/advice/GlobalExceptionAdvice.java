package com.codestatus.advice;

import com.codestatus.exception.BusinessLogicException;
import com.codestatus.exception.ExceptionCode;
import com.codestatus.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionAdvice {
    // 유효성 검증에 실패 했을때 처리하는 메소드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        ExceptionCode exceptionCode = ExceptionCode.INVALID_INPUT_VALUE;
        BindingResult bindingResult = e.getBindingResult();

        StringBuilder builder = new StringBuilder();
        bindingResult.getFieldErrors().forEach(fieldError -> {
            builder.append("[");
            builder.append(fieldError.getField());
            builder.append("](은)는 ");
            builder.append(fieldError.getDefaultMessage());
            builder.append(" 입력된 값: [");
            builder.append(fieldError.getRejectedValue());
            builder.append("]");
        });
        // builder.deleteCharAt(builder.length() - 1);

        ErrorResponse response = new ErrorResponse(ExceptionCode.INVALID_INPUT_VALUE.getStatus(), builder.toString());
        return response;
    }

    // Service 에 있는 Exception 을 처리하는 메소드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBusinessLogicException(BusinessLogicException e) {
        ErrorResponse response = new ErrorResponse(e.getExceptionCode().getStatus(), e.getExceptionCode().getMessage());
        return response;
    }

    // Controller 에 있는 PathVariable 의 타입이 틀릴때 처리하는 메소드
    @ExceptionHandler
    public ErrorResponse handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String errorMessage = "PathVariable 의 타입이 틀립니다.";
        // 필요한 pathVariable 타입을 표시하기
        errorMessage += " 필요한 타입: " + ex.getRequiredType().getSimpleName();
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), errorMessage);
    }
}
