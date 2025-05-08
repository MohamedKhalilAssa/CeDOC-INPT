package ma.inpt.cedoc.model.entities.DoctorantActions;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "publications")
@EntityListeners(AuditingEntityListener.class)
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    @NotBlank(message = "Le journal est obligatoire")
    private String journal;

    @NotBlank(message = "La date de publication est obligatoire")
    private ZonedDateTime datePublication;

    @NotNull(message = "L'état de publication est obligatoire")
    private EtatEnum status;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // ----------------- Relations -----------------

    @OneToMany(mappedBy = "publication")
    private List<Authorship> authorships;
}
