package ma.inpt.cedoc.model.DTOs.Generic;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder

@AllArgsConstructor
@NoArgsConstructor
public class BaseResponseDTO {
    private Long id;
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
