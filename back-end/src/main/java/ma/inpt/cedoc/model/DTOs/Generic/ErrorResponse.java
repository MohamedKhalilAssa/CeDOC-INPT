package ma.inpt.cedoc.model.DTOs.Generic;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorResponse {
    
    private int statusCode;
    private String message;
}