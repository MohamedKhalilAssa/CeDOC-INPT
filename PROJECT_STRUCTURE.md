.
├── back-end
│   ├── .idea
│   │   ├── dataSources
│   │   ├── .gitignore
│   │   ├── compiler.xml
│   │   ├── dataSources.local.xml
│   │   ├── dataSources.xml
│   │   ├── encodings.xml
│   │   ├── jarRepositories.xml
│   │   ├── misc.xml
│   │   ├── vcs.xml
│   │   └── workspace.xml
│   ├── .mvn
│   │   └── wrapper
│   │       └── maven-wrapper.properties
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── ma
│   │   │   │       └── inpt
│   │   │   │           └── cedoc
│   │   │   │               ├── Annotations
│   │   │   │               │   └── FieldMatcher
│   │   │   │               │       ├── FieldMatch.java
│   │   │   │               │       └── FieldMatchValidator.java
│   │   │   │               ├── Configuration
│   │   │   │               │   ├── Security
│   │   │   │               │   │   ├── JWT
│   │   │   │               │   │   │   ├── JwtFilter.java
│   │   │   │               │   │   │   └── JwtUtil.java
│   │   │   │               │   │   └── SecurityConfiguration.java
│   │   │   │               │   ├── ApplicationConfiguration.java
│   │   │   │               │   └── AsyncConfig.java
│   │   │   │               ├── Exceptions
│   │   │   │               │   └── GlobalExceptionHandler.java
│   │   │   │               ├── Helpers
│   │   │   │               │   └── UtilFunctions.java
│   │   │   │               ├── model
│   │   │   │               │   ├── DTOs
│   │   │   │               │   │   ├── Attestation
│   │   │   │               │   │   │   ├── AttestationAutomatiqueRequestDTO.java
│   │   │   │               │   │   │   ├── AttestationAutomatiqueResponseDTO.java
│   │   │   │               │   │   │   ├── AttestationAvecValidationRequestDTO.java
│   │   │   │               │   │   │   ├── AttestationAvecValidationResponseDTO.java
│   │   │   │               │   │   │   └── AttestationResponseDTO.java
│   │   │   │               │   │   ├── auth
│   │   │   │               │   │   │   ├── AuthenticationResponse.java
│   │   │   │               │   │   │   ├── EmailRequest.java
│   │   │   │               │   │   │   ├── EmailVerificationRequest.java
│   │   │   │               │   │   │   ├── LoginRequest.java
│   │   │   │               │   │   │   ├── RegisterRequestDTO.java
│   │   │   │               │   │   │   ├── ResetPasswordRequest.java
│   │   │   │               │   │   │   └── TokenRefreshRequest.java
│   │   │   │               │   │   ├── Candidature
│   │   │   │               │   │   │   └── CandidatureRequestDTO.java
│   │   │   │               │   │   ├── DoctorantActions
│   │   │   │               │   │   │   ├── ConfParticipationRequestDTO.java
│   │   │   │               │   │   │   └── ConfParticipationResponseDTO.java
│   │   │   │               │   │   ├── Formations
│   │   │   │               │   │   │   ├── FormationRequestDTO.java
│   │   │   │               │   │   │   ├── FormationResponseDTO.java
│   │   │   │               │   │   │   ├── SeanceFormationRequestDTO.java
│   │   │   │               │   │   │   ├── SeanceFormationResponseDTO.java
│   │   │   │               │   │   │   ├── VacationRequestDTO.java
│   │   │   │               │   │   │   └── VacationResponseDTO.java
│   │   │   │               │   │   ├── Generic
│   │   │   │               │   │   │   ├── BaseResponseDTO.java
│   │   │   │               │   │   │   └── ErrorResponse.java
│   │   │   │               │   │   ├── mapper
│   │   │   │               │   │   │   ├── AttestationsMappers
│   │   │   │               │   │   │   │   └── AttestationMapper.java
│   │   │   │               │   │   │   ├── DoctorantActionsMappers
│   │   │   │               │   │   │   │   └── ConfParticipationMapper.java
│   │   │   │               │   │   │   ├── formationsMappers
│   │   │   │               │   │   │   │   ├── FormationMapper.java
│   │   │   │               │   │   │   │   ├── SeanceFormationMapper.java
│   │   │   │               │   │   │   │   └── VacationMapper.java
│   │   │   │               │   │   │   ├── MapperHelpers
│   │   │   │               │   │   │   │   └── utilisateurs
│   │   │   │               │   │   │   │       ├── LieuDeNaissanceMapperHelper.java
│   │   │   │               │   │   │   │       └── NationaliteMapperHelper.java
│   │   │   │               │   │   │   ├── ReinscriptionMappers
│   │   │   │               │   │   │   │   ├── AvisResinscriptionMapper.java
│   │   │   │               │   │   │   │   └── DemandeReinscriptionMapper.java
│   │   │   │               │   │   │   └── utilisateursMapper
│   │   │   │               │   │   │       └── UtilisateurMapper.java
│   │   │   │               │   │   ├── Reinscription
│   │   │   │               │   │   │   ├── AvisReinscriptionRequestDTO.java
│   │   │   │               │   │   │   ├── AvisReinscriptionResponseDTO.java
│   │   │   │               │   │   │   ├── DemandeReinscriptionRequestDTO.java
│   │   │   │               │   │   │   └── DemandeReinscriptionResponseDTO.java
│   │   │   │               │   │   └── Utilisateurs
│   │   │   │               │   │       ├── CandidatRegistrationRequestDTO.java
│   │   │   │               │   │       ├── LieuDeNaissanceRequestDTO.java
│   │   │   │               │   │       ├── LieuDeNaissanceResponseDTO.java
│   │   │   │               │   │       ├── NationaliteRequestDTO.java
│   │   │   │               │   │       ├── NationaliteResponseDTO.java
│   │   │   │               │   │       ├── RoleResponseDTO.java
│   │   │   │               │   │       ├── UtilisateurRequestDTO.java
│   │   │   │               │   │       └── UtilisateurResponseDTO.java
│   │   │   │               │   ├── entities
│   │   │   │               │   │   ├── attestation
│   │   │   │               │   │   │   ├── Attestation.java
│   │   │   │               │   │   │   ├── AttestationAutomatique.java
│   │   │   │               │   │   │   ├── AttestationAvecValidation.java
│   │   │   │               │   │   │   └── DemandeAttestation.java
│   │   │   │               │   │   ├── auth
│   │   │   │               │   │   │   └── Token.java
│   │   │   │               │   │   ├── candidature
│   │   │   │               │   │   │   ├── Candidature.java
│   │   │   │               │   │   │   ├── CandidatureAccepter.java
│   │   │   │               │   │   │   ├── CandidatureRefuser.java
│   │   │   │               │   │   │   └── Sujet.java
│   │   │   │               │   │   ├── DoctorantActions
│   │   │   │               │   │   │   ├── Authorship.java
│   │   │   │               │   │   │   ├── ConfParticipation.java
│   │   │   │               │   │   │   └── Publication.java
│   │   │   │               │   │   ├── formation
│   │   │   │               │   │   │   ├── Formation.java
│   │   │   │               │   │   │   ├── SeanceFormation.java
│   │   │   │               │   │   │   └── Vacation.java
│   │   │   │               │   │   ├── Reinscription
│   │   │   │               │   │   │   ├── AvisReinscription.java
│   │   │   │               │   │   │   └── DemandeReinscription.java
│   │   │   │               │   │   ├── soutenance
│   │   │   │               │   │   │   ├── DemandeSoutenance.java
│   │   │   │               │   │   │   ├── Jury.java
│   │   │   │               │   │   │   ├── ProfesseurJury.java
│   │   │   │               │   │   │   └── Soutenance.java
│   │   │   │               │   │   └── utilisateurs
│   │   │   │               │   │       ├── Candidat.java
│   │   │   │               │   │       ├── ChefEquipe.java
│   │   │   │               │   │       ├── DirecteurDeThese.java
│   │   │   │               │   │       ├── DirectionCedoc.java
│   │   │   │               │   │       ├── Doctorant.java
│   │   │   │               │   │       ├── EquipeDeRecherche.java
│   │   │   │               │   │       ├── LieuDeNaissance.java
│   │   │   │               │   │       ├── Nationalite.java
│   │   │   │               │   │       ├── Professeur.java
│   │   │   │               │   │       ├── ResponsableDeFormation.java
│   │   │   │               │   │       ├── Role.java
│   │   │   │               │   │       └── Utilisateur.java
│   │   │   │               │   └── enums
│   │   │   │               │       ├── auth
│   │   │   │               │       │   └── TokenEnum.java
│   │   │   │               │       ├── candidature_enums
│   │   │   │               │       │   ├── CandidatureEnum.java
│   │   │   │               │       │   ├── DiplomeEnum.java
│   │   │   │               │       │   ├── EtablissementEnum.java
│   │   │   │               │       │   ├── MentionEnum.java
│   │   │   │               │       │   └── StatutProfessionnelEnum.java
│   │   │   │               │       ├── doctorant_enums
│   │   │   │               │       │   ├── DemandeSoutenanceEnum.java
│   │   │   │               │       │   ├── EtatAttestationEnum.java
│   │   │   │               │       │   ├── EtatEnum.java
│   │   │   │               │       │   ├── StatutAttestationEnum.java
│   │   │   │               │       │   ├── StatutSoutenanceEnum.java
│   │   │   │               │       │   ├── TypeAttestationAutoEnum.java
│   │   │   │               │       │   └── TypeAttestationValidationEnum.java
│   │   │   │               │       ├── formation_enums
│   │   │   │               │       │   ├── ModuleEnum.java
│   │   │   │               │       │   ├── StatutFormationEnum.java
│   │   │   │               │       │   └── StatutVacationEnum.java
│   │   │   │               │       ├── reinscription_enums
│   │   │   │               │       │   ├── AvancementEnum.java
│   │   │   │               │       │   └── AvisEnum.java
│   │   │   │               │       └── utilisateur_enums
│   │   │   │               │           ├── CEDocEnum.java
│   │   │   │               │           ├── DoctorantEnum.java
│   │   │   │               │           ├── EtatCivilEnum.java
│   │   │   │               │           ├── GenreEnum.java
│   │   │   │               │           ├── GradeProfesseurEnum.java
│   │   │   │               │           └── RoleJuryEnum.java
│   │   │   │               ├── repositories
│   │   │   │               │   ├── AttestationRepositories
│   │   │   │               │   │   ├── AttestationAutomatiqueRepository.java
│   │   │   │               │   │   ├── AttestationAvecValidationRepository.java
│   │   │   │               │   │   ├── AttestationRepository.java
│   │   │   │               │   │   └── DemandeAttestationRepository.java
│   │   │   │               │   ├── authRepositories
│   │   │   │               │   │   └── TokenRepository.java
│   │   │   │               │   ├── candidatureRepositories
│   │   │   │               │   │   ├── CandidatureAccepterRepository.java
│   │   │   │               │   │   ├── CandidatureRefuserRepository.java
│   │   │   │               │   │   ├── CandidatureRepository.java
│   │   │   │               │   │   └── SujetRepository.java
│   │   │   │               │   ├── DoctorantActionsRepositories
│   │   │   │               │   │   ├── AuthorshipRepository.java
│   │   │   │               │   │   ├── ConfParticipationRepository.java
│   │   │   │               │   │   └── PublicationRepository.java
│   │   │   │               │   ├── formationRepositories
│   │   │   │               │   │   ├── FormationRepository.java
│   │   │   │               │   │   ├── SeanceFormationRepository.java
│   │   │   │               │   │   └── VacationRepository.java
│   │   │   │               │   ├── ResinscriptionRepositories
│   │   │   │               │   │   ├── AvisReinscriptionRepository.java
│   │   │   │               │   │   └── DemandeReinscriptionRepository.java
│   │   │   │               │   ├── soutenanceRepositories
│   │   │   │               │   │   ├── DemandeSoutenanceRepository.java
│   │   │   │               │   │   ├── JuryRepository.java
│   │   │   │               │   │   ├── ProfesseurJuryRepository.java
│   │   │   │               │   │   └── SoutenanceRepository.java
│   │   │   │               │   └── utilisateursRepositories
│   │   │   │               │       ├── CandidatRepository.java
│   │   │   │               │       ├── ChefEquipeRepository.java
│   │   │   │               │       ├── DirecteurDeTheseRepository.java
│   │   │   │               │       ├── DirectionCedocRepository.java
│   │   │   │               │       ├── DoctorantRepository.java
│   │   │   │               │       ├── EquipeDeRechercheRepository.java
│   │   │   │               │       ├── LieuDeNaissanceRepository.java
│   │   │   │               │       ├── NationaliteRepository.java
│   │   │   │               │       ├── ProfesseurRepository.java
│   │   │   │               │       ├── ResponsableDeFormationRepository.java
│   │   │   │               │       ├── RoleRepository.java
│   │   │   │               │       └── UtilisateurRepository.java
│   │   │   │               ├── service
│   │   │   │               │   ├── AttestationService
│   │   │   │               │   │   ├── AttestationService.java
│   │   │   │               │   │   └── AttestationServiceImpl.java
│   │   │   │               │   ├── auth
│   │   │   │               │   │   ├── AuthenticationService.java
│   │   │   │               │   │   ├── AuthenticationServiceImpl.java
│   │   │   │               │   │   ├── EmailVerificationService.java
│   │   │   │               │   │   ├── EmailVerificationServiceImpl.java
│   │   │   │               │   │   ├── OtpService.java
│   │   │   │               │   │   ├── OtpServiceImpl.java
│   │   │   │               │   │   ├── TokenService.java
│   │   │   │               │   │   └── TokenServiceImpl.java
│   │   │   │               │   ├── CandidatureSevices
│   │   │   │               │   │   ├── CandidatureService.java
│   │   │   │               │   │   ├── SujetService.java
│   │   │   │               │   │   └── SujetServiceImpl.java
│   │   │   │               │   ├── DoctorantActionService
│   │   │   │               │   │   └── ConfParticipationService.java
│   │   │   │               │   ├── FormationService
│   │   │   │               │   │   ├── FormationService.java
│   │   │   │               │   │   ├── FormationServiceImpl.java
│   │   │   │               │   │   ├── SeanceFormationService.java
│   │   │   │               │   │   ├── SeanceFormationServiceImpl.java
│   │   │   │               │   │   ├── VacationService.java
│   │   │   │               │   │   └── VacationServiceImpl.java
│   │   │   │               │   ├── Global
│   │   │   │               │   │   ├── EmailService.java
│   │   │   │               │   │   └── EmailServiceImpl.java
│   │   │   │               │   ├── Reinscription
│   │   │   │               │   │   ├── AvisReinscriptionService.java
│   │   │   │               │   │   ├── AvisReinscriptionServiceImpl.java
│   │   │   │               │   │   ├── DemandeResincriptionService.java
│   │   │   │               │   │   └── DemandeResincriptionServiceImpl.java
│   │   │   │               │   └── utilisateurServices
│   │   │   │               │       ├── UtilisateurService.java
│   │   │   │               │       └── UtilisateurServiceImpl.java
│   │   │   │               ├── Uploads
│   │   │   │               │   └── .gitkeep
│   │   │   │               ├── web
│   │   │   │               │   ├── AttestationControllers
│   │   │   │               │   │   └── AttestationController.java
│   │   │   │               │   ├── authentication
│   │   │   │               │   │   └── AuthenticationController.java
│   │   │   │               │   ├── DoctorantActionControllers
│   │   │   │               │   │   └── ConfParticipationController.java
│   │   │   │               │   ├── FormationControllers
│   │   │   │               │   │   ├── FormationController.java
│   │   │   │               │   │   ├── SeanceFormationController.java
│   │   │   │               │   │   └── VacationController.java
│   │   │   │               │   ├── guest
│   │   │   │               │   │   └── guestController.java
│   │   │   │               │   ├── Logged
│   │   │   │               │   │   └── LoggedController.java
│   │   │   │               │   ├── Reinscription
│   │   │   │               │   │   ├── AvisReinscriptionController.java
│   │   │   │               │   │   └── DemandeReinscriptionController.java
│   │   │   │               │   └── .gitkeep
│   │   │   │               └── CedocApplication.java
│   │   │   └── resources
│   │   │       ├── static
│   │   │       │   └── images
│   │   │       │       ├── Inpt_Illustration_1.png
│   │   │       │       └── Logo_inpt.png
│   │   │       ├── application-secrets.properties
│   │   │       ├── application-secrets.properties.example
│   │   │       ├── application.properties
│   │   │       └── data.sql
│   │   └── test
│   │       └── java
│   │           └── ma
│   │               └── inpt
│   │                   └── cedoc
│   │                       └── CedocApplicationTests.java
│   ├── target
│   │   ├── classes
│   │   │   ├── ma
│   │   │   │   └── inpt
│   │   │   │       └── cedoc
│   │   │   │           ├── Annotations
│   │   │   │           │   └── FieldMatcher
│   │   │   │           │       ├── FieldMatch.class
│   │   │   │           │       ├── FieldMatch$List.class
│   │   │   │           │       └── FieldMatchValidator.class
│   │   │   │           ├── Configuration
│   │   │   │           │   ├── Security
│   │   │   │           │   │   ├── JWT
│   │   │   │           │   │   │   ├── JwtFilter.class
│   │   │   │           │   │   │   └── JwtUtil.class
│   │   │   │           │   │   └── SecurityConfiguration.class
│   │   │   │           │   ├── ApplicationConfiguration.class
│   │   │   │           │   ├── ApplicationConfiguration$1.class
│   │   │   │           │   └── AsyncConfig.class
│   │   │   │           ├── Exceptions
│   │   │   │           │   └── GlobalExceptionHandler.class
│   │   │   │           ├── Helpers
│   │   │   │           │   └── UtilFunctions.class
│   │   │   │           ├── model
│   │   │   │           │   ├── DTOs
│   │   │   │           │   │   ├── Attestation
│   │   │   │           │   │   │   ├── AttestationAutomatiqueRequestDTO.class
│   │   │   │           │   │   │   ├── AttestationAutomatiqueResponseDTO.class
│   │   │   │           │   │   │   ├── AttestationAutomatiqueResponseDTO$AttestationAutomatiqueResponseDTOBuilder.class
│   │   │   │           │   │   │   ├── AttestationAutomatiqueResponseDTO$AttestationAutomatiqueResponseDTOBuilderImpl.class
│   │   │   │           │   │   │   ├── AttestationAvecValidationRequestDTO.class
│   │   │   │           │   │   │   ├── AttestationAvecValidationResponseDTO.class
│   │   │   │           │   │   │   ├── AttestationAvecValidationResponseDTO$AttestationAvecValidationResponseDTOBuilder.class
│   │   │   │           │   │   │   ├── AttestationAvecValidationResponseDTO$AttestationAvecValidationResponseDTOBuilderImpl.class
│   │   │   │           │   │   │   ├── AttestationResponseDTO.class
│   │   │   │           │   │   │   ├── AttestationResponseDTO$AttestationResponseDTOBuilder.class
│   │   │   │           │   │   │   └── AttestationResponseDTO$AttestationResponseDTOBuilderImpl.class
│   │   │   │           │   │   ├── auth
│   │   │   │           │   │   │   ├── AuthenticationResponse.class
│   │   │   │           │   │   │   ├── AuthenticationResponse$AuthenticationResponseBuilder.class
│   │   │   │           │   │   │   ├── EmailRequest.class
│   │   │   │           │   │   │   ├── EmailRequest$EmailRequestBuilder.class
│   │   │   │           │   │   │   ├── EmailVerificationRequest.class
│   │   │   │           │   │   │   ├── EmailVerificationRequest$EmailVerificationRequestBuilder.class
│   │   │   │           │   │   │   ├── LoginRequest.class
│   │   │   │           │   │   │   ├── LoginRequest$LoginRequestBuilder.class
│   │   │   │           │   │   │   ├── RegisterRequestDTO.class
│   │   │   │           │   │   │   ├── RegisterRequestDTO$RegisterRequestDTOBuilder.class
│   │   │   │           │   │   │   ├── ResetPasswordRequest.class
│   │   │   │           │   │   │   ├── ResetPasswordRequest$ResetPasswordRequestBuilder.class
│   │   │   │           │   │   │   ├── TokenRefreshRequest.class
│   │   │   │           │   │   │   └── TokenRefreshRequest$TokenRefreshRequestBuilder.class
│   │   │   │           │   │   ├── Candidature
│   │   │   │           │   │   │   └── CandidatureRequestDTO.class
│   │   │   │           │   │   ├── DoctorantActions
│   │   │   │           │   │   │   ├── ConfParticipationRequestDTO.class
│   │   │   │           │   │   │   └── ConfParticipationResponseDTO.class
│   │   │   │           │   │   ├── Formations
│   │   │   │           │   │   │   ├── FormationRequestDTO.class
│   │   │   │           │   │   │   ├── FormationResponseDTO.class
│   │   │   │           │   │   │   ├── FormationResponseDTO$FormationResponseDTOBuilder.class
│   │   │   │           │   │   │   ├── FormationResponseDTO$FormationResponseDTOBuilderImpl.class
│   │   │   │           │   │   │   ├── SeanceFormationRequestDTO.class
│   │   │   │           │   │   │   ├── SeanceFormationResponseDTO.class
│   │   │   │           │   │   │   ├── SeanceFormationResponseDTO$SeanceFormationResponseDTOBuilder.class
│   │   │   │           │   │   │   ├── SeanceFormationResponseDTO$SeanceFormationResponseDTOBuilderImpl.class
│   │   │   │           │   │   │   ├── VacationRequestDTO.class
│   │   │   │           │   │   │   ├── VacationResponseDTO.class
│   │   │   │           │   │   │   └── VacationResponseDTO$VacationResponseDTOBuilder.class
│   │   │   │           │   │   ├── Generic
│   │   │   │           │   │   │   ├── BaseResponseDTO.class
│   │   │   │           │   │   │   ├── BaseResponseDTO$BaseResponseDTOBuilder.class
│   │   │   │           │   │   │   ├── BaseResponseDTO$BaseResponseDTOBuilderImpl.class
│   │   │   │           │   │   │   ├── ErrorResponse.class
│   │   │   │           │   │   │   └── ErrorResponse$ErrorResponseBuilder.class
│   │   │   │           │   │   ├── mapper
│   │   │   │           │   │   │   ├── AttestationsMappers
│   │   │   │           │   │   │   │   ├── AttestationMapper.class
│   │   │   │           │   │   │   │   └── AttestationMapperImpl.class
│   │   │   │           │   │   │   ├── DoctorantActionsMappers
│   │   │   │           │   │   │   │   ├── ConfParticipationMapper.class
│   │   │   │           │   │   │   │   └── ConfParticipationMapperImpl.class
│   │   │   │           │   │   │   ├── formationsMappers
│   │   │   │           │   │   │   │   ├── FormationMapper.class
│   │   │   │           │   │   │   │   ├── FormationMapperImpl.class
│   │   │   │           │   │   │   │   ├── SeanceFormationMapper.class
│   │   │   │           │   │   │   │   ├── SeanceFormationMapperImpl.class
│   │   │   │           │   │   │   │   ├── VacationMapper.class
│   │   │   │           │   │   │   │   └── VacationMapperImpl.class
│   │   │   │           │   │   │   ├── MapperHelpers
│   │   │   │           │   │   │   │   └── utilisateurs
│   │   │   │           │   │   │   │       ├── LieuDeNaissanceMapperHelper.class
│   │   │   │           │   │   │   │       └── NationaliteMapperHelper.class
│   │   │   │           │   │   │   ├── ReinscriptionMappers
│   │   │   │           │   │   │   │   ├── AvisResinscriptionMapper.class
│   │   │   │           │   │   │   │   └── DemandeReinscriptionMapper.class
│   │   │   │           │   │   │   └── utilisateursMapper
│   │   │   │           │   │   │       ├── UtilisateurMapper.class
│   │   │   │           │   │   │       └── UtilisateurMapperImpl.class
│   │   │   │           │   │   ├── Reinscription
│   │   │   │           │   │   │   ├── AvisReinscriptionRequestDTO.class
│   │   │   │           │   │   │   ├── AvisReinscriptionResponseDTO.class
│   │   │   │           │   │   │   ├── DemandeReinscriptionRequestDTO.class
│   │   │   │           │   │   │   └── DemandeReinscriptionResponseDTO.class
│   │   │   │           │   │   └── Utilisateurs
│   │   │   │           │   │       ├── CandidatRegistrationRequestDTO.class
│   │   │   │           │   │       ├── CandidatRegistrationRequestDTO$CandidatRegistrationRequestDTOBuilder.class
│   │   │   │           │   │       ├── CandidatRegistrationRequestDTO$CandidatRegistrationRequestDTOBuilderImpl.class
│   │   │   │           │   │       ├── LieuDeNaissanceRequestDTO.class
│   │   │   │           │   │       ├── LieuDeNaissanceResponseDTO.class
│   │   │   │           │   │       ├── LieuDeNaissanceResponseDTO$LieuDeNaissanceResponseDTOBuilder.class
│   │   │   │           │   │       ├── LieuDeNaissanceResponseDTO$LieuDeNaissanceResponseDTOBuilderImpl.class
│   │   │   │           │   │       ├── NationaliteRequestDTO.class
│   │   │   │           │   │       ├── NationaliteRequestDTO$NationaliteRequestDTOBuilder.class
│   │   │   │           │   │       ├── NationaliteResponseDTO.class
│   │   │   │           │   │       ├── NationaliteResponseDTO$NationaliteResponseDTOBuilder.class
│   │   │   │           │   │       ├── NationaliteResponseDTO$NationaliteResponseDTOBuilderImpl.class
│   │   │   │           │   │       ├── RoleResponseDTO.class
│   │   │   │           │   │       ├── RoleResponseDTO$RoleResponseDTOBuilder.class
│   │   │   │           │   │       ├── RoleResponseDTO$RoleResponseDTOBuilderImpl.class
│   │   │   │           │   │       ├── UtilisateurRequestDTO.class
│   │   │   │           │   │       ├── UtilisateurRequestDTO$UtilisateurRequestDTOBuilder.class
│   │   │   │           │   │       ├── UtilisateurRequestDTO$UtilisateurRequestDTOBuilderImpl.class
│   │   │   │           │   │       ├── UtilisateurResponseDTO.class
│   │   │   │           │   │       ├── UtilisateurResponseDTO$UtilisateurResponseDTOBuilder.class
│   │   │   │           │   │       └── UtilisateurResponseDTO$UtilisateurResponseDTOBuilderImpl.class
│   │   │   │           │   ├── entities
│   │   │   │           │   │   ├── attestation
│   │   │   │           │   │   │   ├── Attestation.class
│   │   │   │           │   │   │   ├── AttestationAutomatique.class
│   │   │   │           │   │   │   ├── AttestationAvecValidation.class
│   │   │   │           │   │   │   └── DemandeAttestation.class
│   │   │   │           │   │   ├── auth
│   │   │   │           │   │   │   ├── Token.class
│   │   │   │           │   │   │   └── Token$TokenBuilder.class
│   │   │   │           │   │   ├── candidature
│   │   │   │           │   │   │   ├── Candidature.class
│   │   │   │           │   │   │   ├── CandidatureAccepter.class
│   │   │   │           │   │   │   ├── CandidatureRefuser.class
│   │   │   │           │   │   │   └── Sujet.class
│   │   │   │           │   │   ├── DoctorantActions
│   │   │   │           │   │   │   ├── Authorship.class
│   │   │   │           │   │   │   ├── ConfParticipation.class
│   │   │   │           │   │   │   └── Publication.class
│   │   │   │           │   │   ├── formation
│   │   │   │           │   │   │   ├── Formation.class
│   │   │   │           │   │   │   ├── SeanceFormation.class
│   │   │   │           │   │   │   └── Vacation.class
│   │   │   │           │   │   ├── Reinscription
│   │   │   │           │   │   │   ├── AvisReinscription.class
│   │   │   │           │   │   │   └── DemandeReinscription.class
│   │   │   │           │   │   ├── soutenance
│   │   │   │           │   │   │   ├── DemandeSoutenance.class
│   │   │   │           │   │   │   ├── Jury.class
│   │   │   │           │   │   │   ├── ProfesseurJury.class
│   │   │   │           │   │   │   └── Soutenance.class
│   │   │   │           │   │   └── utilisateurs
│   │   │   │           │   │       ├── Candidat.class
│   │   │   │           │   │       ├── Candidat$CandidatBuilder.class
│   │   │   │           │   │       ├── Candidat$CandidatBuilderImpl.class
│   │   │   │           │   │       ├── ChefEquipe.class
│   │   │   │           │   │       ├── DirecteurDeThese.class
│   │   │   │           │   │       ├── DirectionCedoc.class
│   │   │   │           │   │       ├── Doctorant.class
│   │   │   │           │   │       ├── EquipeDeRecherche.class
│   │   │   │           │   │       ├── LieuDeNaissance.class
│   │   │   │           │   │       ├── Nationalite.class
│   │   │   │           │   │       ├── Professeur.class
│   │   │   │           │   │       ├── ResponsableDeFormation.class
│   │   │   │           │   │       ├── Role.class
│   │   │   │           │   │       ├── Role$RoleBuilder.class
│   │   │   │           │   │       ├── Utilisateur.class
│   │   │   │           │   │       ├── Utilisateur$UtilisateurBuilder.class
│   │   │   │           │   │       └── Utilisateur$UtilisateurBuilderImpl.class
│   │   │   │           │   └── enums
│   │   │   │           │       ├── auth
│   │   │   │           │       │   └── TokenEnum.class
│   │   │   │           │       ├── candidature_enums
│   │   │   │           │       │   ├── CandidatureEnum.class
│   │   │   │           │       │   ├── DiplomeEnum.class
│   │   │   │           │       │   ├── EtablissementEnum.class
│   │   │   │           │       │   ├── MentionEnum.class
│   │   │   │           │       │   └── StatutProfessionnelEnum.class
│   │   │   │           │       ├── doctorant_enums
│   │   │   │           │       │   ├── DemandeSoutenanceEnum.class
│   │   │   │           │       │   ├── EtatAttestationEnum.class
│   │   │   │           │       │   ├── EtatEnum.class
│   │   │   │           │       │   ├── StatutAttestationEnum.class
│   │   │   │           │       │   ├── StatutSoutenanceEnum.class
│   │   │   │           │       │   ├── TypeAttestationAutoEnum.class
│   │   │   │           │       │   └── TypeAttestationValidationEnum.class
│   │   │   │           │       ├── formation_enums
│   │   │   │           │       │   ├── ModuleEnum.class
│   │   │   │           │       │   ├── StatutFormationEnum.class
│   │   │   │           │       │   └── StatutVacationEnum.class
│   │   │   │           │       ├── reinscription_enums
│   │   │   │           │       │   ├── AvancementEnum.class
│   │   │   │           │       │   └── AvisEnum.class
│   │   │   │           │       └── utilisateur_enums
│   │   │   │           │           ├── CEDocEnum.class
│   │   │   │           │           ├── DoctorantEnum.class
│   │   │   │           │           ├── EtatCivilEnum.class
│   │   │   │           │           ├── GenreEnum.class
│   │   │   │           │           ├── GradeProfesseurEnum.class
│   │   │   │           │           └── RoleJuryEnum.class
│   │   │   │           ├── repositories
│   │   │   │           │   ├── AttestationRepositories
│   │   │   │           │   │   ├── AttestationAutomatiqueRepository.class
│   │   │   │           │   │   ├── AttestationAvecValidationRepository.class
│   │   │   │           │   │   ├── AttestationRepository.class
│   │   │   │           │   │   └── DemandeAttestationRepository.class
│   │   │   │           │   ├── authRepositories
│   │   │   │           │   │   └── TokenRepository.class
│   │   │   │           │   ├── candidatureRepositories
│   │   │   │           │   │   ├── CandidatureAccepterRepository.class
│   │   │   │           │   │   ├── CandidatureRefuserRepository.class
│   │   │   │           │   │   ├── CandidatureRepository.class
│   │   │   │           │   │   └── SujetRepository.class
│   │   │   │           │   ├── DoctorantActionsRepositories
│   │   │   │           │   │   ├── AuthorshipRepository.class
│   │   │   │           │   │   ├── ConfParticipationRepository.class
│   │   │   │           │   │   └── PublicationRepository.class
│   │   │   │           │   ├── formationRepositories
│   │   │   │           │   │   ├── FormationRepository.class
│   │   │   │           │   │   ├── SeanceFormationRepository.class
│   │   │   │           │   │   └── VacationRepository.class
│   │   │   │           │   ├── ResinscriptionRepositories
│   │   │   │           │   │   ├── AvisReinscriptionRepository.class
│   │   │   │           │   │   └── DemandeReinscriptionRepository.class
│   │   │   │           │   ├── soutenanceRepositories
│   │   │   │           │   │   ├── DemandeSoutenanceRepository.class
│   │   │   │           │   │   ├── JuryRepository.class
│   │   │   │           │   │   ├── ProfesseurJuryRepository.class
│   │   │   │           │   │   └── SoutenanceRepository.class
│   │   │   │           │   └── utilisateursRepositories
│   │   │   │           │       ├── CandidatRepository.class
│   │   │   │           │       ├── ChefEquipeRepository.class
│   │   │   │           │       ├── DirecteurDeTheseRepository.class
│   │   │   │           │       ├── DirectionCedocRepository.class
│   │   │   │           │       ├── DoctorantRepository.class
│   │   │   │           │       ├── EquipeDeRechercheRepository.class
│   │   │   │           │       ├── LieuDeNaissanceRepository.class
│   │   │   │           │       ├── NationaliteRepository.class
│   │   │   │           │       ├── ProfesseurRepository.class
│   │   │   │           │       ├── ResponsableDeFormationRepository.class
│   │   │   │           │       ├── RoleRepository.class
│   │   │   │           │       └── UtilisateurRepository.class
│   │   │   │           ├── service
│   │   │   │           │   ├── AttestationService
│   │   │   │           │   │   ├── AttestationService.class
│   │   │   │           │   │   └── AttestationServiceImpl.class
│   │   │   │           │   ├── auth
│   │   │   │           │   │   ├── AuthenticationService.class
│   │   │   │           │   │   ├── AuthenticationServiceImpl.class
│   │   │   │           │   │   ├── EmailVerificationService.class
│   │   │   │           │   │   ├── EmailVerificationServiceImpl.class
│   │   │   │           │   │   ├── OtpService.class
│   │   │   │           │   │   ├── OtpServiceImpl.class
│   │   │   │           │   │   ├── TokenService.class
│   │   │   │           │   │   └── TokenServiceImpl.class
│   │   │   │           │   ├── CandidatureSevices
│   │   │   │           │   │   ├── CandidatureService.class
│   │   │   │           │   │   ├── SujetService.class
│   │   │   │           │   │   └── SujetServiceImpl.class
│   │   │   │           │   ├── DoctorantActionService
│   │   │   │           │   │   └── ConfParticipationService.class
│   │   │   │           │   ├── FormationService
│   │   │   │           │   │   ├── FormationService.class
│   │   │   │           │   │   ├── FormationServiceImpl.class
│   │   │   │           │   │   ├── SeanceFormationService.class
│   │   │   │           │   │   ├── SeanceFormationServiceImpl.class
│   │   │   │           │   │   ├── VacationService.class
│   │   │   │           │   │   └── VacationServiceImpl.class
│   │   │   │           │   ├── Global
│   │   │   │           │   │   ├── EmailService.class
│   │   │   │           │   │   └── EmailServiceImpl.class
│   │   │   │           │   ├── Reinscription
│   │   │   │           │   │   ├── AvisReinscriptionService.class
│   │   │   │           │   │   ├── AvisReinscriptionServiceImpl.class
│   │   │   │           │   │   ├── DemandeResincriptionService.class
│   │   │   │           │   │   └── DemandeResincriptionServiceImpl.class
│   │   │   │           │   └── utilisateurServices
│   │   │   │           │       ├── UtilisateurService.class
│   │   │   │           │       └── UtilisateurServiceImpl.class
│   │   │   │           ├── web
│   │   │   │           │   ├── AttestationControllers
│   │   │   │           │   │   └── AttestationController.class
│   │   │   │           │   ├── authentication
│   │   │   │           │   │   └── AuthenticationController.class
│   │   │   │           │   ├── DoctorantActionControllers
│   │   │   │           │   │   └── ConfParticipationController.class
│   │   │   │           │   ├── FormationControllers
│   │   │   │           │   │   ├── FormationController.class
│   │   │   │           │   │   ├── SeanceFormationController.class
│   │   │   │           │   │   └── VacationController.class
│   │   │   │           │   ├── guest
│   │   │   │           │   │   └── guestController.class
│   │   │   │           │   ├── Logged
│   │   │   │           │   │   └── LoggedController.class
│   │   │   │           │   └── Reinscription
│   │   │   │           │       ├── AvisReinscriptionController.class
│   │   │   │           │       └── DemandeReinscriptionController.class
│   │   │   │           └── CedocApplication.class
│   │   │   ├── static
│   │   │   │   └── images
│   │   │   │       ├── Inpt_Illustration_1.png
│   │   │   │       └── Logo_inpt.png
│   │   │   ├── application-secrets.properties
│   │   │   ├── application-secrets.properties.example
│   │   │   ├── application.properties
│   │   │   └── data.sql
│   │   ├── generated-sources
│   │   │   └── annotations
│   │   │       └── ma
│   │   │           └── inpt
│   │   │               └── cedoc
│   │   │                   └── model
│   │   │                       └── DTOs
│   │   │                           └── mapper
│   │   │                               ├── AttestationsMappers
│   │   │                               │   └── AttestationMapperImpl.java
│   │   │                               ├── DoctorantActionsMappers
│   │   │                               │   └── ConfParticipationMapperImpl.java
│   │   │                               ├── formationsMappers
│   │   │                               │   ├── FormationMapperImpl.java
│   │   │                               │   ├── SeanceFormationMapperImpl.java
│   │   │                               │   └── VacationMapperImpl.java
│   │   │                               └── utilisateursMapper
│   │   │                                   └── UtilisateurMapperImpl.java
│   │   ├── generated-test-sources
│   │   │   └── test-annotations
│   │   └── test-classes
│   │       └── ma
│   │           └── inpt
│   │               └── cedoc
│   │                   └── CedocApplicationTests.class
│   ├── .gitattributes
│   ├── .gitignore
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── README.md
│   ├── setup-secrets.sh
│   ├── setup.cmd
│   └── TO_READ_BEFORE_STARTING.txt
├── front-end
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── assets
│   │   │   └── index.css
│   │   ├── Components
│   │   │   ├── common
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Counter.tsx
│   │   │   │   ├── SectionTitle.tsx
│   │   │   │   └── TimelineItem.tsx
│   │   │   ├── Footer
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── FooterLink.tsx
│   │   │   │   └── FooterLinkGroup.tsx
│   │   │   ├── Form
│   │   │   │   ├── FormInterfaces.ts
│   │   │   │   ├── InputField.tsx
│   │   │   │   └── SelectField.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── Navbar.tsx
│   │   ├── data
│   │   │   └── landingpage
│   │   │       ├── programs.ts
│   │   │       ├── research.ts
│   │   │       ├── testimonials.ts
│   │   │       └── timeline.ts
│   │   ├── Helpers
│   │   │   ├── checkAuth.ts
│   │   │   └── CRUDFunctions.ts
│   │   ├── Layout
│   │   │   ├── AuthLayout.tsx
│   │   │   └── GuestLayout.tsx
│   │   ├── Pages
│   │   │   ├── Authentication
│   │   │   │   ├── EmailVerificationPage.tsx
│   │   │   │   ├── SignInPage.tsx
│   │   │   │   └── SignUpPage.tsx
│   │   │   └── LandingPage.tsx
│   │   ├── public
│   │   │   └── config.ts
│   │   ├── Sections
│   │   │   ├── Authentication
│   │   │   │   ├── EmailVerificationForm.tsx
│   │   │   │   ├── SignInForm.tsx
│   │   │   │   └── SignUpForm.tsx
│   │   │   └── LandingPage
│   │   │       ├── AdmissionSection.tsx
│   │   │       ├── ContactSection.tsx
│   │   │       ├── CtaSection.tsx
│   │   │       ├── HeroSection.tsx
│   │   │       ├── NewsSection.tsx
│   │   │       ├── ProgramsSection.tsx
│   │   │       ├── ResearchSection.tsx
│   │   │       ├── StatsSection.tsx
│   │   │       ├── TestimonialsSection.tsx
│   │   │       └── TimelineSection.tsx
│   │   ├── Types
│   │   │   ├── landingPage.ts
│   │   │   └── RegisterTypes.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── .gitignore
│   ├── env.d.ts
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── package-lock.json
└── PROJECT_STRUCTURE.md

199 directories, 514 files
