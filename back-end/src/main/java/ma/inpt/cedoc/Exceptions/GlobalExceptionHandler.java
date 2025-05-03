package ma.inpt.cedoc.Exceptions;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<Map<String, Object>> errors = new ArrayList<>();
        Map<String, Object> response = new LinkedHashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            Map<String, Object> errorDetails = new HashMap<>();

            if (error instanceof FieldError fieldError) {
                errorDetails.put("field", fieldError.getField());
                errorDetails.put("message", fieldError.getDefaultMessage());
                errorDetails.put("rejectedValue", fieldError.getRejectedValue());
            } else {
                errorDetails.put("field", "global");
                errorDetails.put("message", error.getDefaultMessage());
            }

            errors.add(errorDetails);
        });

        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("errors", errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> handleConstraintViolationExceptions(ConstraintViolationException ex) {
        Map<String, Object> response = new HashMap<>();
        Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();

        for (ConstraintViolation<?> violation : violations) {
            // Create custom error message per violation
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();

            Map<String, Object> error = new HashMap<>();
            error.put("field", fieldName);
            error.put("message", errorMessage);
            response.put(fieldName, error);
        }

        response.put("status", HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}