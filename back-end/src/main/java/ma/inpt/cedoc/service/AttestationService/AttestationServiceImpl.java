package ma.inpt.cedoc.service.AttestationService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import ma.inpt.cedoc.Exceptions.UserNotFoundException;
import ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers.DoctorantMapper;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatAttestationEnum;
import ma.inpt.cedoc.model.enums.doctorant_enums.StatutAttestationEnum;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
@Slf4j
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
    private UtilisateurRepository utilisateurRepository;

    /* ------------------ Save & Send methods ------------------ */

    @Override
    public AttestationAutomatiqueResponseDTO generateAndSendAttestationAutomatique(TypeAttestationAutoEnum typeAttestation, String username) throws IOException {

        // 1. Find the user and doctorant
        Utilisateur utilisateur = utilisateurRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("Utilisateur non trouvé avec l'email: " + username));

        Doctorant doctorant = utilisateur.getDoctorant();
        if (doctorant == null) {
            throw new IllegalStateException("L'utilisateur n'est pas un doctorant");
        }

        // 2. Create attestation entity
        AttestationAutomatique attestation = createAttestationEntity(doctorant, typeAttestation);

        // 3. Save the attestation
        attestation = attestationAutomatiqueRepository.save(attestation);
        log.info("Attestation saved with ID: {}", attestation.getId());

        Map<String, Object> data = prepareAttestationData(doctorant, typeAttestation, attestation);

        // 5. Generate PDF
        byte[] pdfBytes = generateAttestationAutomatique(data);




        // Envoi d'e-mail
        emailService.sendEmailWithAttachment(
                doctorant.getUtilisateur().getEmail(),
                "Votre attestation automatique",
                "Veuillez trouver ci-joint votre attestation.",
                pdfBytes,
                "attestation.pdf"
        );

        return AttestationAutomatiqueResponseDTO.builder()
                .id(attestation.getId())
                .typeAttestationAutomatique(typeAttestation)
                .statutAttestation(StatutAttestationEnum.AUTOMATIQUE)
                .dateDemande(attestation.getDateDemande())
                .success(true)
                .message("Attestation générée et envoyée avec succès")
                .build();
    }

    private Map<String, Object> prepareAttestationData(Doctorant doctorant, TypeAttestationAutoEnum typeAttestation, AttestationAutomatique attestation) {
        Map<String, Object> data = new HashMap<>();

        // User information
        Utilisateur utilisateur = doctorant.getUtilisateur();
        data.put("fullName", utilisateur.getNom() + " " + utilisateur.getPrenom());
        data.put("email", utilisateur.getEmail());
        data.put("dateNaissance", utilisateur.getDateNaissance());
        data.put("lieuNaissance", utilisateur.getLieuDeNaissance() != null ?
                utilisateur.getLieuDeNaissance().getVille() + ", " + utilisateur.getLieuDeNaissance().getPays() : "");

        // Doctorant information
        data.put("cne", doctorant.getCne());
        data.put("cin", doctorant.getCin());
        data.put("dateInscription", doctorant.getDateInscription());
        data.put("anneeEnCours", doctorant.getAnneeEnCours());
        data.put("niveauActuel", doctorant.getNiveauActuel());
        data.put("cycle", doctorant.getCycle());

        // Research team information
        if (doctorant.getEquipeDeRecherche() != null) {
            data.put("equipeRecherche", doctorant.getEquipeDeRecherche().getNomDeLequipe());
        }

        // Attestation specific information
        data.put("typeAttestation", typeAttestation);
        data.put("dateGeneration", LocalDate.now());

        String paragraph = switch (typeAttestation) {
            case INSCRIPTION -> "Est inscrit(e) en thèse au Centre d’Études Doctorales en Télécommunications et Technologies de l’Information (CEDoc2TI) de l’Institut National des Postes et Télécommunications (INPT).";
            case TRAVAIL -> "Travaille à plein temps au sein du laboratoire" + doctorant.getEquipeDeRecherche() + " du Centre d’Études Doctorales en Télécommunications et Technologies de l’Information (CEDoc2TI) de l’Institut National des Postes et Télécommunications (INPT), dans le cadre de ses travaux de recherche doctorale.";
            default -> throw new IllegalArgumentException("Type inconnu : " + typeAttestation);
        };
        data.put("attestationParagraph", paragraph);

        log.debug("Prepared attestation data: {}", data);
        return data;
    }

    private AttestationAutomatique createAttestationEntity(Doctorant doctorant, TypeAttestationAutoEnum typeAttestation) {
        AttestationAutomatique attestation = new AttestationAutomatique();
        attestation.setDoctorant(doctorant);
        attestation.setTypeAttestationAutomatique(typeAttestation);
        attestation.setStatutAttestation(StatutAttestationEnum.AUTOMATIQUE);
        attestation.setDateDemande(LocalDateTime.now());
        return attestation;
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
                data.put("fullName", doctorant.getUtilisateur().getNom() + " " + doctorant.getUtilisateur().getPrenom());
//                data.put("cne", doctorant.getCne());
//                data.put("cin", doctorant.getCin());
                data.put("birthDate", doctorant.getUtilisateur().getDateNaissance());
                data.put("birthPlace", doctorant.getUtilisateur().getLieuDeNaissance());
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
                        doctorant.getUtilisateur().getEmail(),
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
