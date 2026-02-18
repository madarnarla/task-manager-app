package com.example.Backend.exception;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public Map<String, String> handleRuntime(RuntimeException ex) {
        Map<String, String> err = new HashMap<>();
        err.put("error", ex.getMessage());
        return err;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> err = new HashMap<>();
        err.put("error", "Validation failed");
        return err;
    }
}
