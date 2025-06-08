package ma.inpt.cedoc.repositories.model.DTOs.Candidature;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SujetEquipeDTO {
    private String intituleSujet;
    private String nomEquipe;

    public String getIntituleSujet() {
        return intituleSujet;
    }

    public void setIntituleSujet(String intituleSujet) {
        this.intituleSujet = intituleSujet;
    }

    public String getNomEquipe() {
        return nomEquipe;
    }

    public void setNomEquipe(String nomEquipe) {
        this.nomEquipe = nomEquipe;
    }
}
