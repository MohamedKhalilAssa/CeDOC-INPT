package ma.inpt.cedoc.Exceptions;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import ma.inpt.cedoc.model.DTOs.Generic.ErrorResponse;

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

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatusException(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(
                ErrorResponse.builder()
                        .statusCode(ex.getStatusCode().value())
                        .message(ex.getReason())
                        .build());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(EntityNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder().statusCode(
                HttpStatus.NOT_FOUND.value()).message(
                        "Ressource introuvable : " + ex.getMessage())
                .build();
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity
                .badRequest()
                .body(ErrorResponse.builder()
                        .statusCode(HttpStatus.BAD_REQUEST.value())
                        .message(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Une erreur interne est survenue", ex);
    }

    // Handle AuthenticationException globally
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException authException) {

        // Create standardized error response
        ErrorResponse errorResponse = ErrorResponse.builder().statusCode(HttpStatus.FORBIDDEN.value())
                .message("Authentication failed: " + authException.getMessage())
                .build();

        // Return custom error response with 401 status code
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus status, String message, Exception ex) {
        return ResponseEntity.status(status).body(
                ErrorResponse.builder()
                        .statusCode(status.value())
                        .message(message + ": " + ex.getMessage())
                        .build());
    }
}