package com.codestatus.response;

import com.codestatus.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class ValidationErrorResponse {
    private int status_code;
    private List<Object> message;

    public static ValidationErrorResponse of (BindingResult bindingResult){
        return new ValidationErrorResponse(ExceptionCode.INVALID_INPUT_VALUE.getStatus(), FieldError.of(bindingResult));
    }
    public static ValidationErrorResponse of (Set<ConstraintViolation<?>> violations){
        return new ValidationErrorResponse(ExceptionCode.INVALID_INPUT_VALUE.getStatus(), ConstraintViolationError.of(violations));
    }
    @Getter
    @AllArgsConstructor
    public static class FieldError {
        private String field;
        private Object rejectedValue;
        private String reason;

        public static List<Object> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(err -> new FieldError(
                            err.getField(),
                            err.getRejectedValue() == null ? "":err.getRejectedValue().toString(),
                            err.getDefaultMessage())).collect(Collectors.toList());
        }
    }
    @Getter
    @AllArgsConstructor
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        public static List<Object> of (Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(violation -> new ConstraintViolationError(
                            violation.getPropertyPath().toString(),
                            violation.getInvalidValue().toString(),
                            violation.getMessage()))
                    .collect(Collectors.toList());
        }
    }
}