package ma.inpt.cedoc.service.AttestationService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers.DoctorantMapper;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatAttestationEnum;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Attestation.*;
import ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers.AttestationMapper;
import ma.inpt.cedoc.model.entities.attestation.Attestation;
import ma.inpt.cedoc.model.entities.attestation.AttestationAutomatique;
import ma.inpt.cedoc.model.entities.attestation.AttestationAvecValidation;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationAutoEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.TypeAttestationValidationEnum;
import ma.inpt.cedoc.repositories.AttestationRepositories.AttestationAutomatiqueRepository;
import ma.inpt.cedoc.repositories.AttestationRepositories.AttestationAvecValidationRepository;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

@Service
@RequiredArgsConstructor
@Transactional
public class AttestationServiceImpl implements AttestationService {

    private final AttestationAutomatiqueRepository attestationAutomatiqueRepository;
    private final AttestationAvecValidationRepository attestationAvecValidationRepository;
    private final AttestationMapper attestationMapper;
    private final DoctorantMapper doctorantMapper;
    @Autowired
    private TemplateEngine templateEngine;
    @Autowired
    private EmailService emailService;
    @Autowired
    private DoctorantRepository doctorantRepository;

    /* ------------------ Save & Send methods ------------------ */

    @Override
    public AttestationAutomatiqueResponseDTO generateAndSendAttestationAutomatique(DoctorantRequestDTO request) throws IOException {
        // Génération de l’attestation
        Map<String, Object> data = new HashMap<>();
        data.put("fullName", request.getNom() + " " + request.getPrenom());
        data.put("cne", request.getCne());
        data.put("cin", request.getCin());
        data.put("birthDate", request.getBirthDate());
        data.put("birthPlace", request.getBirthPlace());
        data.put("firstEnrollmentDate", request.getFirstEnrollmentDate());
        data.put("researchTeam", request.getResearchTeam());
        data.put("currentYear", request.getCurrentYear());
        data.put("currentLevel", request.getCurrentLevel());
        data.put("cycle", request.getCycle());
        data.put("attestationAutoType", request.getTypeAttestationAuto());

        // Choix du paragraphe selon le type d'attestation
        String paragraph;
        TypeAttestationAutoEnum type = request.getTypeAttestationAuto();

        switch (type) {
            case INSCRIPTION:
                paragraph = "Est inscrit(e) en thèse au Centre d’Études Doctorales en Télécommunications et Technologies de l’Information (CEDoc2TI) de l’Institut National des Postes et Télécommunications (INPT).";
                break;
            case TRAVAIL:
                paragraph = "Travaille à plein temps au sein du laboratoire " + request.getResearchTeam() +
                        " du Centre d’Études Doctorales en Télécommunications et Technologies de l’Information (CEDoc2TI) de l’Institut National des Postes et Télécommunications (INPT), dans le cadre de ses travaux de recherche doctorale.";
                break;
            default:
                throw new IllegalArgumentException("Type d'attestation automatique inconnu : " + type);
        }

        data.put("attestationParagraph", paragraph);


        byte[] pdfBytes = generateAttestationAutomatique(data);

        Doctorant doctorant = doctorantMapper.doctorantRequestDTOToDoctorant(request);
        doctorantRepository.save(doctorant);

        // Sauvegarde dans la base de données
        AttestationAutomatiqueRequestDTO dto = AttestationAutomatiqueRequestDTO.builder()
                .doctorant(doctorant)
                .typeAttestationAutomatique(request.getTypeAttestationAuto())
                .build();

        System.out.println(dto);

        AttestationAutomatique saved = attestationMapper.attestationAutomatiqueRequestDTOToAttestationAutomatique(dto);
        saved = attestationAutomatiqueRepository.save(saved);

        // Envoi d'e-mail
        emailService.sendEmailWithAttachment(
                request.getEmail(),
                "Votre attestation automatique",
                "Veuillez trouver ci-joint votre attestation.",
                pdfBytes,
                "attestation.pdf"
        );

        return attestationMapper.attestationAutomatiqueToAttestationAutomatiqueResponseDTO(saved);
    }


    @Override
    public AttestationAvecValidationResponseDTO requestAttestationAvecValidation(DoctorantRequestDTO request) {
        Doctorant doctorant = doctorantMapper.doctorantRequestDTOToDoctorant(request);

        AttestationAvecValidationRequestDTO dto = AttestationAvecValidationRequestDTO.builder()
                .doctorant(doctorant)
                .typeAttestationValidation(request.getTypeAttestationValidation())
                .build();

        AttestationAvecValidation attestation = attestationMapper
                .attestationAvecValidationRequestDTOToAttestationAvecValidation(dto);
        AttestationAvecValidation saved = attestationAvecValidationRepository.save(attestation);
        return attestationMapper.attestationAvecValidationToAttestationAvecValidationResponseDTO(saved);
    }

    /* ------------------ Generate methods ------------------ */

    public byte[] generateAttestationAutomatique(Map<String, Object> data) throws IOException {
        // 1. Fill Thymeleaf template
        Context context = new Context();
        context.setVariables(data);
        String html = templateEngine.process("attestationAutomatique", context); // assumes attestationAutomatique.html is in src/main/resources/templates/

        // 2. Configure Flying Saucer
        ITextRenderer renderer = new ITextRenderer();

        // Load images from classpath
        String baseUrl = new ClassPathResource("/static/").getURL().toString(); // e.g. file:/.../resources/static/
        renderer.setDocumentFromString(html, baseUrl);
        renderer.layout();

        // 3. Output to byte array
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            renderer.createPDF(outputStream);
            return outputStream.toByteArray();
        }
    }

    public byte[] generateAttestationAvecValidation(Map<String, Object> data) throws IOException {
        // 1. Fill Thymeleaf template
        Context context = new Context();
        context.setVariables(data);
        String html = templateEngine.process("attestationAvecValidation", context); // assumes attestationAvecValidation.html is in src/main/resources/templates/

        // 2. Configure Flying Saucer
        ITextRenderer renderer = new ITextRenderer();

        // Load images from classpath
        String baseUrl = new ClassPathResource("/static/").getURL().toString(); // e.g. file:/.../resources/static/
        renderer.setDocumentFromString(html, baseUrl);
        renderer.layout();

        // 3. Output to byte array
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            renderer.createPDF(outputStream);
            return outputStream.toByteArray();
        }
    }

    /* ------------------ Get all methods ------------------ */

    @Override
    public List<AttestationAutomatiqueResponseDTO> getAllAttestationsAutomatiques() {
        return attestationAutomatiqueRepository.findAll().stream()
                .map(attestationMapper::attestationAutomatiqueToAttestationAutomatiqueResponseDTO)
                .collect(Collectors.toList());
    }

    // @Override
    public List<Attestation> getAllAttestations() {
        return List.of();
        // return
        // attestationRepository.findAll().stream().map(attestationMapper::attestationToAttestationResponseDTO)
        // .collect(Collectors.toList());
        // ;
    }

    @Override
    public List<AttestationAvecValidationResponseDTO> getAllAttestationsAvecValidation() {
        return attestationAvecValidationRepository.findAll().stream()
                .map(attestationMapper::attestationAvecValidationToAttestationAvecValidationResponseDTO)
                .collect(Collectors.toList());
    }

    /* ------------------ Find by type methods ------------------ */

    @Override
    public List<AttestationAutomatiqueResponseDTO> findAutomatiqueByType(
            TypeAttestationAutoEnum typeAttestationAutomatique) {
        return attestationAutomatiqueRepository.findByTypeAttestationAutomatique(typeAttestationAutomatique).stream()
                .map(attestationMapper::attestationAutomatiqueToAttestationAutomatiqueResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttestationAvecValidationResponseDTO> findAvecValidationByType(
            TypeAttestationValidationEnum typeAttestationValidation) {
        return attestationAvecValidationRepository.findByTypeAttestationValidation(typeAttestationValidation).stream()
                .map(attestationMapper::attestationAvecValidationToAttestationAvecValidationResponseDTO)
                .collect(Collectors.toList());
    }

    /* ------------------ Find by ID ------------------ */

    @Override
    public AttestationAutomatiqueResponseDTO findAutomatiqueById(Long id) {
        AttestationAutomatique attestation = attestationAutomatiqueRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation non trouvée"));
        return attestationMapper.attestationAutomatiqueToAttestationAutomatiqueResponseDTO(attestation);
    }

    @Override
    public AttestationAvecValidationResponseDTO findAvecValidationById(Long id) {
        AttestationAvecValidation attestation = attestationAvecValidationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation non trouvée"));
        return attestationMapper.attestationAvecValidationToAttestationAvecValidationResponseDTO(attestation);
    }

    /* ------------------ Update ------------------ */

    @Override
    public AttestationAvecValidationResponseDTO updateEtatAttestationAvecValidation(Long id, AttestationAvecValidationUpdateDTO dto) {
        AttestationAvecValidation entity = attestationAvecValidationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation not found"));

        // Update etat
        attestationMapper.updateEtatAttestationAvecValidationFromDTO(dto, entity);

        // Save updated entity first
        AttestationAvecValidation updated = attestationAvecValidationRepository.save(entity);

        // If validated, generate attestation and send email
        if (EtatAttestationEnum.VALIDEE.equals(dto.getEtatAttestation())) {
            try {
                Doctorant doctorant = updated.getDoctorant();
                TypeAttestationValidationEnum type = updated.getTypeAttestationValidation();

                // Build the data map
                Map<String, Object> data = new HashMap<>();
                data.put("fullName", doctorant.getNom() + " " + doctorant.getPrenom());
//                data.put("cne", doctorant.getCne());
//                data.put("cin", doctorant.getCin());
                data.put("birthDate", doctorant.getDateNaissance());
                data.put("birthPlace", doctorant.getLieuDeNaissance());
                data.put("firstEnrollmentDate", doctorant.getDateInscription());
                data.put("researchTeam", doctorant.getEquipeDeRecherche());
//                data.put("currentYear", doctorant.getAnneeEnCours());
//                data.put("currentLevel", doctorant.getNiveauActuel());
//                data.put("cycle", doctorant.getCycle());
                data.put("attestationValidationType", type);

                // Build the paragraph (customize if needed)
                String paragraph;
                switch (type) {
                    case AUTORISATION_DE_LA_SOUTENANCE:
                        paragraph = "A obtenu l’autorisation officielle de soutenir sa thèse de doctorat, conformément à la réglementation en vigueur au sein du Centre d’Études Doctorales en Télécommunications et Technologies de l’Information (CEDoc2TI) de l’Institut National des Postes et Télécommunications (INPT).";
                        break;
                    case SOUTENANCE:
                        paragraph = "A soutenu avec succès sa thèse de doctorat au sein du Centre d’Études Doctorales en Télécommunications et Technologies de l’Information (CEDoc2TI) de l’Institut National des Postes et Télécommunications (INPT), devant un jury composé conformément aux exigences réglementaires.";
                        break;
                    default:
                        throw new IllegalArgumentException("Type d'attestation avec validation inconnu : " + type);
                }

                data.put("attestationParagraph", paragraph);

                // Generate PDF
                byte[] pdf = generateAttestationAvecValidation(data);

                // Send email
                emailService.sendEmailWithAttachment(
                        doctorant.getEmail(),
                        "Votre attestation validée",
                        "Votre attestation a été validée. Vous la trouverez en pièce jointe.",
                        pdf,
                        "attestation_validee.pdf"
                );

            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de l'envoi du mail");
            }
        }

        return attestationMapper.attestationAvecValidationToAttestationAvecValidationResponseDTO(updated);
    }


    /* ------------------ Delete ------------------ */

    @Override
    public void deleteAttestationAutomatiqueById(Long id) {
        if (!attestationAutomatiqueRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation non trouvée pour suppression");
        }
        attestationAutomatiqueRepository.deleteById(id);
    }

    @Override
    public void deleteAttestationAvecValidationById(Long id) {
        if (!attestationAvecValidationRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attestation non trouvée pour suppression");
        }
        attestationAvecValidationRepository.deleteById(id);
    }
}
