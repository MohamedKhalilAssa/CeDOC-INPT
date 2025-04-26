package ma.inpt.cedoc.model.entities.utilisateurs;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "nationalites")
public class Nationalite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "L'intitule de la nationalite est obligatoire")
    @Size(min = 2, max = 50, message = "L'intitule doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "L'Intitule ne doit contenir que des lettres, des espaces ou des tirets")
    private String intitule;

    // for logging and administration purposes it will be filled by the system
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // Relations

    @OneToMany(mappedBy = "nationalite")
    private List<Utilisateur> utilisateurs;
}
