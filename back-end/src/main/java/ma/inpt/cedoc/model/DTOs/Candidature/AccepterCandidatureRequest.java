package ma.inpt.cedoc.model.DTOs.Candidature;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AccepterCandidatureRequest {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate dateEntretien;
}
