package ma.inpt.cedoc.model.DTOs.Utilisateurs;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NationaliteResponseDTO {
    private Long id;

    private String intitule;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
