.
├── backend.md
├── mvnw
├── mvnw.cmd
├── pom.xml
├── README.md
├── setup-secrets.sh
├── setup.cmd
├── src
│   ├── main
│   │   ├── java
│   │   │   └── ma
│   │   │       └── inpt
│   │   │           └── cedoc
│   │   │               ├── Annotations
│   │   │               │   └── FieldMatcher
│   │   │               │       ├── FieldMatch.java
│   │   │               │       └── FieldMatchValidator.java
│   │   │               ├── CedocApplication.java
│   │   │               ├── Configuration
│   │   │               │   ├── ApplicationConfiguration.java
│   │   │               │   ├── AsyncConfig.java
│   │   │               │   └── Security
│   │   │               │       ├── JWT
│   │   │               │       │   ├── AccessTokenFilter.java
│   │   │               │       │   ├── JwtUtil.java
│   │   │               │       │   └── RefreshTokenFilter.java
│   │   │               │       └── SecurityConfiguration.java
│   │   │               ├── Exceptions
│   │   │               │   └── GlobalExceptionHandler.java
│   │   │               ├── Helpers
│   │   │               │   └── UtilFunctions.java
│   │   │               ├── model
│   │   │               │   ├── DTOs
│   │   │               │   │   ├── Attestation
│   │   │               │   │   │   ├── AttestationAutomatiqueRequestDTO.java
│   │   │               │   │   │   ├── AttestationAutomatiqueResponseDTO.java
│   │   │               │   │   │   ├── AttestationAvecValidationRequestDTO.java
│   │   │               │   │   │   ├── AttestationAvecValidationResponseDTO.java
│   │   │               │   │   │   ├── AttestationAvecValidationUpdateDTO.java
│   │   │               │   │   │   ├── AttestationRequestDTO.java
│   │   │               │   │   │   └── AttestationResponseDTO.java
│   │   │               │   │   ├── auth
│   │   │               │   │   │   ├── AuthenticationResponse.java
│   │   │               │   │   │   ├── EmailRequest.java
│   │   │               │   │   │   ├── EmailVerificationRequest.java
│   │   │               │   │   │   ├── LoginRequest.java
│   │   │               │   │   │   ├── RegisterRequestDTO.java
│   │   │               │   │   │   ├── ResetPasswordRequest.java
│   │   │               │   │   │   └── TokenRefreshRequest.java
│   │   │               │   │   ├── Candidature
│   │   │               │   │   │   ├── CandidatureRequestDTO.java
│   │   │               │   │   │   ├── CandidatureResponseDTO.java
│   │   │               │   │   │   ├── SujetEquipeDTO.java
│   │   │               │   │   │   ├── SujetRequestDTO.java
│   │   │               │   │   │   ├── SujetResponseDTO.java
│   │   │               │   │   │   └── SujetResponseSimpleDTO.java
│   │   │               │   │   ├── DoctorantActions
│   │   │               │   │   │   ├── ConfParticipationRequestDTO.java
│   │   │               │   │   │   ├── ConfParticipationResponseDTO.java
│   │   │               │   │   │   ├── PublicationRequestDTO.java
│   │   │               │   │   │   └── PublicationResponseDTO.java
│   │   │               │   │   ├── Formations
│   │   │               │   │   │   ├── FormationRequestDTO.java
│   │   │               │   │   │   ├── FormationResponseDTO.java
│   │   │               │   │   │   ├── SeanceFormationRequestDTO.java
│   │   │               │   │   │   ├── SeanceFormationResponseDTO.java
│   │   │               │   │   │   ├── VacationRequestDTO.java
│   │   │               │   │   │   └── VacationResponseDTO.java
│   │   │               │   │   ├── Generic
│   │   │               │   │   │   ├── BaseResponseDTO.java
│   │   │               │   │   │   ├── ErrorResponse.java
│   │   │               │   │   │   └── PaginatedResponseDTO.java
│   │   │               │   │   ├── mapper
│   │   │               │   │   │   ├── AttestationsMappers
│   │   │               │   │   │   │   └── AttestationMapper.java
│   │   │               │   │   │   ├── CandidatureMappers
│   │   │               │   │   │   │   ├── CandidatureMapper.java
│   │   │               │   │   │   │   ├── CandidatureMapperImpl.java
│   │   │               │   │   │   │   ├── EquipeMapper.java
│   │   │               │   │   │   │   ├── SujetEquipeMapperImpl.java
│   │   │               │   │   │   │   ├── SujetMapper.java
│   │   │               │   │   │   │   └── SujetMapperImpl.java
│   │   │               │   │   │   ├── DoctorantActionsMappers
│   │   │               │   │   │   │   ├── ConfParticipationMapper.java
│   │   │               │   │   │   │   └── PublicationMapper.java
│   │   │               │   │   │   ├── formationsMappers
│   │   │               │   │   │   │   ├── FormationMapper.java
│   │   │               │   │   │   │   ├── SeanceFormationMapper.java
│   │   │               │   │   │   │   └── VacationMapper.java
│   │   │               │   │   │   ├── Global
│   │   │               │   │   │   │   └── PaginatedMapper.java
│   │   │               │   │   │   ├── MapperHelpers
│   │   │               │   │   │   │   └── utilisateurs
│   │   │               │   │   │   │       ├── LieuDeNaissanceMapperHelper.java
│   │   │               │   │   │   │       └── NationaliteMapperHelper.java
│   │   │               │   │   │   ├── ReinscriptionMappers
│   │   │               │   │   │   │   ├── AvisResinscriptionMapper.java
│   │   │               │   │   │   │   └── DemandeReinscriptionMapper.java
│   │   │               │   │   │   └── utilisateursMapper
│   │   │               │   │   │       ├── CandidatMapper.java
│   │   │               │   │   │       ├── CandidatMapperImpl.java
│   │   │               │   │   │       ├── ChefEquipeMapperImpl.java
│   │   │               │   │   │       ├── NationaliteMapper.java
│   │   │               │   │   │       ├── ProfesseurMapper.java
│   │   │               │   │   │       ├── ProfesseurMapperImpl.java
│   │   │               │   │   │       ├── UtilisateurMapper.java
│   │   │               │   │   │       └── UtilisateurMapperImpl.java
│   │   │               │   │   ├── Reinscription
│   │   │               │   │   │   ├── AvisReinscriptionRequestDTO.java
│   │   │               │   │   │   ├── AvisReinscriptionResponseDTO.java
│   │   │               │   │   │   ├── DemandeReinscriptionRequestDTO.java
│   │   │               │   │   │   └── DemandeReinscriptionResponseDTO.java
│   │   │               │   │   └── Utilisateurs
│   │   │               │   │       ├── CandidatRequestDTO.java
│   │   │               │   │       ├── CandidatResponseDTO.java
│   │   │               │   │       ├── ChefSujetsResponseDTO.java
│   │   │               │   │       ├── LieuDeNaissanceRequestDTO.java
│   │   │               │   │       ├── LieuDeNaissanceResponseDTO.java
│   │   │               │   │       ├── NationaliteRequestDTO.java
│   │   │               │   │       ├── NationaliteResponseDTO.java
│   │   │               │   │       ├── RoleAssignmentRequestDTO.java
│   │   │               │   │       ├── RoleResponseDTO.java
│   │   │               │   │       ├── simpleDTOs
│   │   │               │   │       │   ├── EquipeSimpleDTO.java
│   │   │               │   │       │   ├── ProfesseurResponseDTO.java
│   │   │               │   │       │   └── UtilisateurResponseDTO.java
│   │   │               │   │       ├── UtilisateurRequestDTO.java
│   │   │               │   │       └── UtilisateurResponseDTO.java
│   │   │               │   ├── entities
│   │   │               │   │   ├── attestation
│   │   │               │   │   │   ├── Attestation.java
│   │   │               │   │   │   ├── AttestationAutomatique.java
│   │   │               │   │   │   ├── AttestationAvecValidation.java
│   │   │               │   │   │   └── DemandeAttestation.java
│   │   │               │   │   ├── auth
│   │   │               │   │   │   └── Token.java
│   │   │               │   │   ├── candidature
│   │   │               │   │   │   ├── Candidature.java
│   │   │               │   │   │   ├── CandidatureAccepter.java
│   │   │               │   │   │   ├── CandidatureRefuser.java
│   │   │               │   │   │   └── Sujet.java
│   │   │               │   │   ├── DoctorantActions
│   │   │               │   │   │   ├── ConfParticipation.java
│   │   │               │   │   │   └── Publication.java
│   │   │               │   │   ├── formation
│   │   │               │   │   │   ├── Formation.java
│   │   │               │   │   │   ├── SeanceFormation.java
│   │   │               │   │   │   └── Vacation.java
│   │   │               │   │   ├── Reinscription
│   │   │               │   │   │   ├── AvisReinscription.java
│   │   │               │   │   │   └── DemandeReinscription.java
│   │   │               │   │   ├── soutenance
│   │   │               │   │   │   ├── DemandeSoutenance.java
│   │   │               │   │   │   ├── Jury.java
│   │   │               │   │   │   ├── ProfesseurJury.java
│   │   │               │   │   │   └── Soutenance.java
│   │   │               │   │   └── utilisateurs
│   │   │               │   │       ├── Candidat.java
│   │   │               │   │       ├── ChefEquipeRole.java
│   │   │               │   │       ├── DirecteurDeTheseRole.java
│   │   │               │   │       ├── DirectionCedoc.java
│   │   │               │   │       ├── Doctorant.java
│   │   │               │   │       ├── EquipeDeRecherche.java
│   │   │               │   │       ├── LieuDeNaissance.java
│   │   │               │   │       ├── Nationalite.java
│   │   │               │   │       ├── Professeur.java
│   │   │               │   │       ├── ResponsableDeFormationRole.java
│   │   │               │   │       ├── Role.java
│   │   │               │   │       └── Utilisateur.java
│   │   │               │   └── enums
│   │   │               │       ├── auth
│   │   │               │       │   └── TokenEnum.java
│   │   │               │       ├── candidature_enums
│   │   │               │       │   ├── CandidatureEnum.java
│   │   │               │       │   ├── DiplomeEnum.java
│   │   │               │       │   ├── EtablissementEnum.java
│   │   │               │       │   ├── MentionEnum.java
│   │   │               │       │   └── StatutProfessionnelEnum.java
│   │   │               │       ├── doctorant_enums
│   │   │               │       │   ├── DemandeSoutenanceEnum.java
│   │   │               │       │   ├── EtatAttestationEnum.java
│   │   │               │       │   ├── EtatEnum.java
│   │   │               │       │   ├── StatutAttestationEnum.java
│   │   │               │       │   ├── StatutSoutenanceEnum.java
│   │   │               │       │   ├── TypeAttestationAutoEnum.java
│   │   │               │       │   └── TypeAttestationValidationEnum.java
│   │   │               │       ├── formation_enums
│   │   │               │       │   ├── ModuleEnum.java
│   │   │               │       │   ├── StatutFormationEnum.java
│   │   │               │       │   └── StatutVacationEnum.java
│   │   │               │       ├── reinscription_enums
│   │   │               │       │   ├── AvancementEnum.java
│   │   │               │       │   └── AvisEnum.java
│   │   │               │       └── utilisateur_enums
│   │   │               │           ├── CEDocEnum.java
│   │   │               │           ├── DoctorantEnum.java
│   │   │               │           ├── EtatCivilEnum.java
│   │   │               │           ├── GenreEnum.java
│   │   │               │           ├── GradeProfesseurEnum.java
│   │   │               │           ├── RoleEnum.java
│   │   │               │           └── RoleJuryEnum.java
│   │   │               ├── repositories
│   │   │               │   ├── AttestationRepositories
│   │   │               │   │   ├── AttestationAutomatiqueRepository.java
│   │   │               │   │   ├── AttestationAvecValidationRepository.java
│   │   │               │   │   └── DemandeAttestationRepository.java
│   │   │               │   ├── authRepositories
│   │   │               │   │   └── TokenRepository.java
│   │   │               │   ├── candidatureRepositories
│   │   │               │   │   ├── CandidatureAccepterRepository.java
│   │   │               │   │   ├── CandidatureRefuserRepository.java
│   │   │               │   │   ├── CandidatureRepository.java
│   │   │               │   │   └── SujetRepository.java
│   │   │               │   ├── DoctorantActionsRepositories
│   │   │               │   │   ├── ConfParticipationRepository.java
│   │   │               │   │   └── PublicationRepository.java
│   │   │               │   ├── formationRepositories
│   │   │               │   │   ├── FormationRepository.java
│   │   │               │   │   ├── SeanceFormationRepository.java
│   │   │               │   │   └── VacationRepository.java
│   │   │               │   ├── ResinscriptionRepositories
│   │   │               │   │   ├── AvisReinscriptionRepository.java
│   │   │               │   │   └── DemandeReinscriptionRepository.java
│   │   │               │   ├── soutenanceRepositories
│   │   │               │   │   ├── DemandeSoutenanceRepository.java
│   │   │               │   │   ├── JuryRepository.java
│   │   │               │   │   ├── ProfesseurJuryRepository.java
│   │   │               │   │   └── SoutenanceRepository.java
│   │   │               │   └── utilisateursRepositories
│   │   │               │       ├── CandidatRepository.java
│   │   │               │       ├── ChefEquipeRoleRepository.java
│   │   │               │       ├── DirecteurDeTheseRoleRepository.java
│   │   │               │       ├── DirectionCedocRepository.java
│   │   │               │       ├── DoctorantRepository.java
│   │   │               │       ├── EquipeDeRechercheRepository.java
│   │   │               │       ├── LieuDeNaissanceRepository.java
│   │   │               │       ├── NationaliteRepository.java
│   │   │               │       ├── ProfesseurRepository.java
│   │   │               │       ├── ResponsableDeFormationRoleRepository.java
│   │   │               │       ├── RoleRepository.java
│   │   │               │       └── UtilisateurRepository.java
│   │   │               ├── service
│   │   │               │   ├── AttestationService
│   │   │               │   │   ├── AttestationService.java
│   │   │               │   │   └── AttestationServiceImpl.java
│   │   │               │   ├── auth
│   │   │               │   │   ├── AuthenticationService.java
│   │   │               │   │   ├── AuthenticationServiceImpl.java
│   │   │               │   │   ├── EmailVerificationService.java
│   │   │               │   │   ├── EmailVerificationServiceImpl.java
│   │   │               │   │   ├── OtpService.java
│   │   │               │   │   ├── OtpServiceImpl.java
│   │   │               │   │   ├── TokenService.java
│   │   │               │   │   └── TokenServiceImpl.java
│   │   │               │   ├── CandidatureSevices
│   │   │               │   │   ├── CandidatureService.java
│   │   │               │   │   ├── CandidatureServiceImpl.java
│   │   │               │   │   ├── SujetService.java
│   │   │               │   │   └── SujetServiceImpl.java
│   │   │               │   ├── DoctorantActionService
│   │   │               │   │   ├── ConfParticipationService.java
│   │   │               │   │   ├── ConfParticipationServiceImpl.java
│   │   │               │   │   ├── PublicationService.java
│   │   │               │   │   └── PublicationServiceImpl.java
│   │   │               │   ├── FormationService
│   │   │               │   │   ├── FormationService.java
│   │   │               │   │   ├── FormationServiceImpl.java
│   │   │               │   │   ├── SeanceFormationService.java
│   │   │               │   │   ├── SeanceFormationServiceImpl.java
│   │   │               │   │   ├── VacationService.java
│   │   │               │   │   └── VacationServiceImpl.java
│   │   │               │   ├── Global
│   │   │               │   │   ├── EmailService.java
│   │   │               │   │   ├── EmailServiceImpl.java
│   │   │               │   │   ├── FileService.java
│   │   │               │   │   └── FileServiceImpl.java
│   │   │               │   ├── Reinscription
│   │   │               │   │   ├── AvisReinscriptionService.java
│   │   │               │   │   ├── AvisReinscriptionServiceImpl.java
│   │   │               │   │   ├── DemandeResincriptionService.java
│   │   │               │   │   └── DemandeResincriptionServiceImpl.java
│   │   │               │   └── utilisateurServices
│   │   │               │       ├── CandidatService.java
│   │   │               │       ├── CandidatServiceImpl.java
│   │   │               │       ├── ChefEquipeService.java
│   │   │               │       ├── ChefEquipeServiceImpl.java
│   │   │               │       ├── DirecteurDeTheseService.java
│   │   │               │       ├── DirecteurDeTheseServiceImpl.java
│   │   │               │       ├── LieuDeNaissanceService.java
│   │   │               │       ├── LieuDeNaissanceServiceImpl.java
│   │   │               │       ├── NationaliteService.java
│   │   │               │       ├── NationaliteServiceImpl.java
│   │   │               │       ├── ProfesseurService.java
│   │   │               │       ├── ProfesseurServiceImpl.java
│   │   │               │       ├── UtilisateurService.java
│   │   │               │       └── UtilisateurServiceImpl.java
│   │   │               └── web
│   │   │                   ├── AttestationControllers
│   │   │                   │   └── AttestationController.java
│   │   │                   ├── authentication
│   │   │                   │   └── AuthenticationController.java
│   │   │                   ├── CandidatureControllers
│   │   │                   │   ├── CandidatureController.java
│   │   │                   │   └── SujetController.java
│   │   │                   ├── DoctorantActionControllers
│   │   │                   │   ├── ConfParticipationController.java
│   │   │                   │   └── PublicationController.java
│   │   │                   ├── FormationControllers
│   │   │                   │   ├── FormationController.java
│   │   │                   │   ├── SeanceFormationController.java
│   │   │                   │   └── VacationController.java
│   │   │                   ├── guest
│   │   │                   │   └── guestController.java
│   │   │                   ├── Logged
│   │   │                   │   └── LoggedController.java
│   │   │                   ├── Reinscription
│   │   │                   │   ├── AvisReinscriptionController.java
│   │   │                   │   └── DemandeReinscriptionController.java
│   │   │                   └── Utilisateurs
│   │   │                       ├── ChefEquipeController.java
│   │   │                       ├── LieuDeNaissanceController.java
│   │   │                       ├── NationaliteController.java
│   │   │                       ├── ProfesseurController.java
│   │   │                       └── UtilisateurController.java
│   │   └── resources
│   │       ├── application-secrets.properties
│   │       ├── application-secrets.properties.example
│   │       ├── application.properties
│   │       ├── data_new.sql
│   │       ├── data.sql
│   │       ├── reset_db.sql
│   │       └── static
│   │           └── images
│   │               └── Logo_inpt.png
│   ├── test
│   │   └── java
│   │       └── ma
│   │           └── inpt
│   │               └── cedoc
│   │                   └── CedocApplicationTests.java
│   └── Uploads
├── target
│   ├── cedoc-0.0.1-SNAPSHOT.jar
│   ├── cedoc-0.0.1-SNAPSHOT.jar.original
│   ├── classes
│   │   ├── application-secrets.properties
│   │   ├── application-secrets.properties.example
│   │   ├── application.properties
│   │   ├── data_new.sql
│   │   ├── data.sql
│   │   ├── ma
│   │   │   └── inpt
│   │   │       └── cedoc
│   │   │           ├── Annotations
│   │   │           │   └── FieldMatcher
│   │   │           │       ├── FieldMatch.class
│   │   │           │       ├── FieldMatch$List.class
│   │   │           │       └── FieldMatchValidator.class
│   │   │           ├── CedocApplication.class
│   │   │           ├── Configuration
│   │   │           │   ├── ApplicationConfiguration.class
│   │   │           │   ├── ApplicationConfiguration$1.class
│   │   │           │   ├── AsyncConfig.class
│   │   │           │   └── Security
│   │   │           │       ├── JWT
│   │   │           │       │   ├── AccessTokenFilter.class
│   │   │           │       │   ├── JwtUtil.class
│   │   │           │       │   └── RefreshTokenFilter.class
│   │   │           │       └── SecurityConfiguration.class
│   │   │           ├── Exceptions
│   │   │           │   └── GlobalExceptionHandler.class
│   │   │           ├── Helpers
│   │   │           │   └── UtilFunctions.class
│   │   │           ├── model
│   │   │           │   ├── DTOs
│   │   │           │   │   ├── Attestation
│   │   │           │   │   │   ├── AttestationAutomatiqueRequestDTO.class
│   │   │           │   │   │   ├── AttestationAutomatiqueResponseDTO.class
│   │   │           │   │   │   ├── AttestationAutomatiqueResponseDTO$AttestationAutomatiqueResponseDTOBuilder.class
│   │   │           │   │   │   ├── AttestationAutomatiqueResponseDTO$AttestationAutomatiqueResponseDTOBuilderImpl.class
│   │   │           │   │   │   ├── AttestationAvecValidationRequestDTO.class
│   │   │           │   │   │   ├── AttestationAvecValidationResponseDTO.class
│   │   │           │   │   │   ├── AttestationAvecValidationResponseDTO$AttestationAvecValidationResponseDTOBuilder.class
│   │   │           │   │   │   ├── AttestationAvecValidationResponseDTO$AttestationAvecValidationResponseDTOBuilderImpl.class
│   │   │           │   │   │   ├── AttestationAvecValidationUpdateDTO.class
│   │   │           │   │   │   ├── AttestationRequestDTO.class
│   │   │           │   │   │   ├── AttestationResponseDTO.class
│   │   │           │   │   │   ├── AttestationResponseDTO$AttestationResponseDTOBuilder.class
│   │   │           │   │   │   └── AttestationResponseDTO$AttestationResponseDTOBuilderImpl.class
│   │   │           │   │   ├── auth
│   │   │           │   │   │   ├── AuthenticationResponse.class
│   │   │           │   │   │   ├── AuthenticationResponse$AuthenticationResponseBuilder.class
│   │   │           │   │   │   ├── EmailRequest.class
│   │   │           │   │   │   ├── EmailRequest$EmailRequestBuilder.class
│   │   │           │   │   │   ├── EmailVerificationRequest.class
│   │   │           │   │   │   ├── EmailVerificationRequest$EmailVerificationRequestBuilder.class
│   │   │           │   │   │   ├── LoginRequest.class
│   │   │           │   │   │   ├── LoginRequest$LoginRequestBuilder.class
│   │   │           │   │   │   ├── RegisterRequestDTO.class
│   │   │           │   │   │   ├── RegisterRequestDTO$RegisterRequestDTOBuilder.class
│   │   │           │   │   │   ├── ResetPasswordRequest.class
│   │   │           │   │   │   ├── ResetPasswordRequest$ResetPasswordRequestBuilder.class
│   │   │           │   │   │   ├── TokenRefreshRequest.class
│   │   │           │   │   │   └── TokenRefreshRequest$TokenRefreshRequestBuilder.class
│   │   │           │   │   ├── Candidature
│   │   │           │   │   │   ├── CandidatureRequestDTO.class
│   │   │           │   │   │   ├── CandidatureRequestDTO$CandidatureRequestDTOBuilder.class
│   │   │           │   │   │   ├── CandidatureRequestDTO$CandidatureRequestDTOBuilderImpl.class
│   │   │           │   │   │   ├── CandidatureResponseDTO.class
│   │   │           │   │   │   ├── CandidatureResponseDTO$CandidatureResponseDTOBuilder.class
│   │   │           │   │   │   ├── CandidatureResponseDTO$CandidatureResponseDTOBuilderImpl.class
│   │   │           │   │   │   ├── SujetEquipeDTO.class
│   │   │           │   │   │   ├── SujetEquipeDTO$SujetEquipeDTOBuilder.class
│   │   │           │   │   │   ├── SujetRequestDTO.class
│   │   │           │   │   │   ├── SujetResponseDTO.class
│   │   │           │   │   │   ├── SujetResponseDTO$SujetResponseDTOBuilder.class
│   │   │           │   │   │   ├── SujetResponseSimpleDTO.class
│   │   │           │   │   │   └── SujetResponseSimpleDTO$SujetResponseSimpleDTOBuilder.class
│   │   │           │   │   ├── DoctorantActions
│   │   │           │   │   │   ├── ConfParticipationRequestDTO.class
│   │   │           │   │   │   ├── ConfParticipationResponseDTO.class
│   │   │           │   │   │   ├── PublicationRequestDTO.class
│   │   │           │   │   │   └── PublicationResponseDTO.class
│   │   │           │   │   ├── Formations
│   │   │           │   │   │   ├── FormationRequestDTO.class
│   │   │           │   │   │   ├── FormationResponseDTO.class
│   │   │           │   │   │   ├── FormationResponseDTO$FormationResponseDTOBuilder.class
│   │   │           │   │   │   ├── FormationResponseDTO$FormationResponseDTOBuilderImpl.class
│   │   │           │   │   │   ├── SeanceFormationRequestDTO.class
│   │   │           │   │   │   ├── SeanceFormationResponseDTO.class
│   │   │           │   │   │   ├── SeanceFormationResponseDTO$SeanceFormationResponseDTOBuilder.class
│   │   │           │   │   │   ├── SeanceFormationResponseDTO$SeanceFormationResponseDTOBuilderImpl.class
│   │   │           │   │   │   ├── VacationRequestDTO.class
│   │   │           │   │   │   ├── VacationResponseDTO.class
│   │   │           │   │   │   ├── VacationResponseDTO$VacationResponseDTOBuilder.class
│   │   │           │   │   │   └── VacationResponseDTO$VacationResponseDTOBuilderImpl.class
│   │   │           │   │   ├── Generic
│   │   │           │   │   │   ├── BaseResponseDTO.class
│   │   │           │   │   │   ├── BaseResponseDTO$BaseResponseDTOBuilder.class
│   │   │           │   │   │   ├── BaseResponseDTO$BaseResponseDTOBuilderImpl.class
│   │   │           │   │   │   ├── ErrorResponse.class
│   │   │           │   │   │   ├── ErrorResponse$ErrorResponseBuilder.class
│   │   │           │   │   │   ├── PaginatedResponseDTO.class
│   │   │           │   │   │   └── PaginatedResponseDTO$PaginatedResponseDTOBuilder.class
│   │   │           │   │   ├── mapper
│   │   │           │   │   │   ├── AttestationsMappers
│   │   │           │   │   │   │   ├── AttestationMapper.class
│   │   │           │   │   │   │   └── AttestationMapperImpl.class
│   │   │           │   │   │   ├── CandidatureMappers
│   │   │           │   │   │   │   ├── CandidatureMapper.class
│   │   │           │   │   │   │   ├── CandidatureMapperImpl.class
│   │   │           │   │   │   │   ├── EquipeMapper.class
│   │   │           │   │   │   │   ├── SujetEquipeMapperImpl.class
│   │   │           │   │   │   │   ├── SujetMapper.class
│   │   │           │   │   │   │   └── SujetMapperImpl.class
│   │   │           │   │   │   ├── DoctorantActionsMappers
│   │   │           │   │   │   │   ├── ConfParticipationMapper.class
│   │   │           │   │   │   │   └── PublicationMapper.class
│   │   │           │   │   │   ├── formationsMappers
│   │   │           │   │   │   │   ├── FormationMapper.class
│   │   │           │   │   │   │   ├── SeanceFormationMapper.class
│   │   │           │   │   │   │   └── VacationMapper.class
│   │   │           │   │   │   ├── Global
│   │   │           │   │   │   │   └── PaginatedMapper.class
│   │   │           │   │   │   ├── MapperHelpers
│   │   │           │   │   │   │   └── utilisateurs
│   │   │           │   │   │   │       ├── LieuDeNaissanceMapperHelper.class
│   │   │           │   │   │   │       └── NationaliteMapperHelper.class
│   │   │           │   │   │   ├── ReinscriptionMappers
│   │   │           │   │   │   │   ├── AvisResinscriptionMapper.class
│   │   │           │   │   │   │   └── DemandeReinscriptionMapper.class
│   │   │           │   │   │   └── utilisateursMapper
│   │   │           │   │   │       ├── CandidatMapper.class
│   │   │           │   │   │       ├── CandidatMapperImpl.class
│   │   │           │   │   │       ├── ChefEquipeMapperImpl.class
│   │   │           │   │   │       ├── NationaliteMapper.class
│   │   │           │   │   │       ├── ProfesseurMapper.class
│   │   │           │   │   │       ├── ProfesseurMapperImpl.class
│   │   │           │   │   │       ├── UtilisateurMapper.class
│   │   │           │   │   │       └── UtilisateurMapperImpl.class
│   │   │           │   │   ├── Reinscription
│   │   │           │   │   │   ├── AvisReinscriptionRequestDTO.class
│   │   │           │   │   │   ├── AvisReinscriptionResponseDTO.class
│   │   │           │   │   │   ├── DemandeReinscriptionRequestDTO.class
│   │   │           │   │   │   └── DemandeReinscriptionResponseDTO.class
│   │   │           │   │   └── Utilisateurs
│   │   │           │   │       ├── CandidatRequestDTO.class
│   │   │           │   │       ├── CandidatRequestDTO$CandidatRequestDTOBuilder.class
│   │   │           │   │       ├── CandidatRequestDTO$CandidatRequestDTOBuilderImpl.class
│   │   │           │   │       ├── CandidatResponseDTO.class
│   │   │           │   │       ├── CandidatResponseDTO$CandidatResponseDTOBuilder.class
│   │   │           │   │       ├── CandidatResponseDTO$CandidatResponseDTOBuilderImpl.class
│   │   │           │   │       ├── ChefSujetsResponseDTO.class
│   │   │           │   │       ├── ChefSujetsResponseDTO$ChefSujetsResponseDTOBuilder.class
│   │   │           │   │       ├── LieuDeNaissanceRequestDTO.class
│   │   │           │   │       ├── LieuDeNaissanceResponseDTO.class
│   │   │           │   │       ├── LieuDeNaissanceResponseDTO$LieuDeNaissanceResponseDTOBuilder.class
│   │   │           │   │       ├── LieuDeNaissanceResponseDTO$LieuDeNaissanceResponseDTOBuilderImpl.class
│   │   │           │   │       ├── NationaliteRequestDTO.class
│   │   │           │   │       ├── NationaliteRequestDTO$NationaliteRequestDTOBuilder.class
│   │   │           │   │       ├── NationaliteResponseDTO.class
│   │   │           │   │       ├── NationaliteResponseDTO$NationaliteResponseDTOBuilder.class
│   │   │           │   │       ├── NationaliteResponseDTO$NationaliteResponseDTOBuilderImpl.class
│   │   │           │   │       ├── RoleAssignmentRequestDTO.class
│   │   │           │   │       ├── RoleResponseDTO.class
│   │   │           │   │       ├── RoleResponseDTO$RoleResponseDTOBuilder.class
│   │   │           │   │       ├── RoleResponseDTO$RoleResponseDTOBuilderImpl.class
│   │   │           │   │       ├── simpleDTOs
│   │   │           │   │       │   ├── EquipeSimpleDTO.class
│   │   │           │   │       │   ├── EquipeSimpleDTO$EquipeSimpleDTOBuilder.class
│   │   │           │   │       │   ├── ProfesseurResponseDTO.class
│   │   │           │   │       │   ├── ProfesseurResponseDTO$ProfesseurResponseDTOBuilder.class
│   │   │           │   │       │   ├── ProfesseurResponseDTO$ProfesseurResponseDTOBuilderImpl.class
│   │   │           │   │       │   ├── UtilisateurResponseDTO.class
│   │   │           │   │       │   ├── UtilisateurResponseDTO$UtilisateurResponseDTOBuilder.class
│   │   │           │   │       │   └── UtilisateurResponseDTO$UtilisateurResponseDTOBuilderImpl.class
│   │   │           │   │       ├── UtilisateurRequestDTO.class
│   │   │           │   │       ├── UtilisateurRequestDTO$UtilisateurRequestDTOBuilder.class
│   │   │           │   │       ├── UtilisateurRequestDTO$UtilisateurRequestDTOBuilderImpl.class
│   │   │           │   │       ├── UtilisateurResponseDTO.class
│   │   │           │   │       ├── UtilisateurResponseDTO$UtilisateurResponseDTOBuilder.class
│   │   │           │   │       └── UtilisateurResponseDTO$UtilisateurResponseDTOBuilderImpl.class
│   │   │           │   ├── entities
│   │   │           │   │   ├── attestation
│   │   │           │   │   │   ├── Attestation.class
│   │   │           │   │   │   ├── AttestationAutomatique.class
│   │   │           │   │   │   ├── AttestationAvecValidation.class
│   │   │           │   │   │   └── DemandeAttestation.class
│   │   │           │   │   ├── auth
│   │   │           │   │   │   ├── Token.class
│   │   │           │   │   │   └── Token$TokenBuilder.class
│   │   │           │   │   ├── candidature
│   │   │           │   │   │   ├── Candidature.class
│   │   │           │   │   │   ├── Candidature$CandidatureBuilder.class
│   │   │           │   │   │   ├── CandidatureAccepter.class
│   │   │           │   │   │   ├── CandidatureRefuser.class
│   │   │           │   │   │   ├── Sujet.class
│   │   │           │   │   │   └── Sujet$SujetBuilder.class
│   │   │           │   │   ├── DoctorantActions
│   │   │           │   │   │   ├── ConfParticipation.class
│   │   │           │   │   │   └── Publication.class
│   │   │           │   │   ├── formation
│   │   │           │   │   │   ├── Formation.class
│   │   │           │   │   │   ├── SeanceFormation.class
│   │   │           │   │   │   └── Vacation.class
│   │   │           │   │   ├── Reinscription
│   │   │           │   │   │   ├── AvisReinscription.class
│   │   │           │   │   │   └── DemandeReinscription.class
│   │   │           │   │   ├── soutenance
│   │   │           │   │   │   ├── DemandeSoutenance.class
│   │   │           │   │   │   ├── Jury.class
│   │   │           │   │   │   ├── ProfesseurJury.class
│   │   │           │   │   │   └── Soutenance.class
│   │   │           │   │   └── utilisateurs
│   │   │           │   │       ├── Candidat.class
│   │   │           │   │       ├── Candidat$CandidatBuilder.class
│   │   │           │   │       ├── ChefEquipeRole.class
│   │   │           │   │       ├── DirecteurDeTheseRole.class
│   │   │           │   │       ├── DirectionCedoc.class
│   │   │           │   │       ├── Doctorant.class
│   │   │           │   │       ├── Doctorant$DoctorantBuilder.class
│   │   │           │   │       ├── EquipeDeRecherche.class
│   │   │           │   │       ├── LieuDeNaissance.class
│   │   │           │   │       ├── Nationalite.class
│   │   │           │   │       ├── Professeur.class
│   │   │           │   │       ├── Professeur$ProfesseurBuilder.class
│   │   │           │   │       ├── ResponsableDeFormationRole.class
│   │   │           │   │       ├── Role.class
│   │   │           │   │       ├── Role$RoleBuilder.class
│   │   │           │   │       ├── Utilisateur.class
│   │   │           │   │       ├── Utilisateur$UtilisateurBuilder.class
│   │   │           │   │       └── Utilisateur$UtilisateurBuilderImpl.class
│   │   │           │   └── enums
│   │   │           │       ├── auth
│   │   │           │       │   └── TokenEnum.class
│   │   │           │       ├── candidature_enums
│   │   │           │       │   ├── CandidatureEnum.class
│   │   │           │       │   ├── DiplomeEnum.class
│   │   │           │       │   ├── EtablissementEnum.class
│   │   │           │       │   ├── MentionEnum.class
│   │   │           │       │   └── StatutProfessionnelEnum.class
│   │   │           │       ├── doctorant_enums
│   │   │           │       │   ├── DemandeSoutenanceEnum.class
│   │   │           │       │   ├── EtatAttestationEnum.class
│   │   │           │       │   ├── EtatEnum.class
│   │   │           │       │   ├── StatutAttestationEnum.class
│   │   │           │       │   ├── StatutSoutenanceEnum.class
│   │   │           │       │   ├── TypeAttestationAutoEnum.class
│   │   │           │       │   └── TypeAttestationValidationEnum.class
│   │   │           │       ├── formation_enums
│   │   │           │       │   ├── ModuleEnum.class
│   │   │           │       │   ├── StatutFormationEnum.class
│   │   │           │       │   └── StatutVacationEnum.class
│   │   │           │       ├── reinscription_enums
│   │   │           │       │   ├── AvancementEnum.class
│   │   │           │       │   └── AvisEnum.class
│   │   │           │       └── utilisateur_enums
│   │   │           │           ├── CEDocEnum.class
│   │   │           │           ├── DoctorantEnum.class
│   │   │           │           ├── EtatCivilEnum.class
│   │   │           │           ├── GenreEnum.class
│   │   │           │           ├── GradeProfesseurEnum.class
│   │   │           │           ├── RoleEnum.class
│   │   │           │           └── RoleJuryEnum.class
│   │   │           ├── repositories
│   │   │           │   ├── AttestationRepositories
│   │   │           │   │   ├── AttestationAutomatiqueRepository.class
│   │   │           │   │   ├── AttestationAvecValidationRepository.class
│   │   │           │   │   └── DemandeAttestationRepository.class
│   │   │           │   ├── authRepositories
│   │   │           │   │   └── TokenRepository.class
│   │   │           │   ├── candidatureRepositories
│   │   │           │   │   ├── CandidatureAccepterRepository.class
│   │   │           │   │   ├── CandidatureRefuserRepository.class
│   │   │           │   │   ├── CandidatureRepository.class
│   │   │           │   │   └── SujetRepository.class
│   │   │           │   ├── DoctorantActionsRepositories
│   │   │           │   │   ├── ConfParticipationRepository.class
│   │   │           │   │   └── PublicationRepository.class
│   │   │           │   ├── formationRepositories
│   │   │           │   │   ├── FormationRepository.class
│   │   │           │   │   ├── SeanceFormationRepository.class
│   │   │           │   │   └── VacationRepository.class
│   │   │           │   ├── ResinscriptionRepositories
│   │   │           │   │   ├── AvisReinscriptionRepository.class
│   │   │           │   │   └── DemandeReinscriptionRepository.class
│   │   │           │   ├── soutenanceRepositories
│   │   │           │   │   ├── DemandeSoutenanceRepository.class
│   │   │           │   │   ├── JuryRepository.class
│   │   │           │   │   ├── ProfesseurJuryRepository.class
│   │   │           │   │   └── SoutenanceRepository.class
│   │   │           │   └── utilisateursRepositories
│   │   │           │       ├── CandidatRepository.class
│   │   │           │       ├── ChefEquipeRoleRepository.class
│   │   │           │       ├── DirecteurDeTheseRoleRepository.class
│   │   │           │       ├── DirectionCedocRepository.class
│   │   │           │       ├── DoctorantRepository.class
│   │   │           │       ├── EquipeDeRechercheRepository.class
│   │   │           │       ├── LieuDeNaissanceRepository.class
│   │   │           │       ├── NationaliteRepository.class
│   │   │           │       ├── ProfesseurRepository.class
│   │   │           │       ├── ResponsableDeFormationRoleRepository.class
│   │   │           │       ├── RoleRepository.class
│   │   │           │       └── UtilisateurRepository.class
│   │   │           ├── service
│   │   │           │   ├── AttestationService
│   │   │           │   │   ├── AttestationService.class
│   │   │           │   │   └── AttestationServiceImpl.class
│   │   │           │   ├── auth
│   │   │           │   │   ├── AuthenticationService.class
│   │   │           │   │   ├── AuthenticationServiceImpl.class
│   │   │           │   │   ├── EmailVerificationService.class
│   │   │           │   │   ├── EmailVerificationServiceImpl.class
│   │   │           │   │   ├── OtpService.class
│   │   │           │   │   ├── OtpServiceImpl.class
│   │   │           │   │   ├── TokenService.class
│   │   │           │   │   └── TokenServiceImpl.class
│   │   │           │   ├── CandidatureSevices
│   │   │           │   │   ├── CandidatureService.class
│   │   │           │   │   ├── CandidatureServiceImpl.class
│   │   │           │   │   ├── SujetService.class
│   │   │           │   │   └── SujetServiceImpl.class
│   │   │           │   ├── DoctorantActionService
│   │   │           │   │   ├── ConfParticipationService.class
│   │   │           │   │   ├── ConfParticipationServiceImpl.class
│   │   │           │   │   ├── PublicationService.class
│   │   │           │   │   └── PublicationServiceImpl.class
│   │   │           │   ├── FormationService
│   │   │           │   │   ├── FormationService.class
│   │   │           │   │   ├── FormationServiceImpl.class
│   │   │           │   │   ├── SeanceFormationService.class
│   │   │           │   │   ├── SeanceFormationServiceImpl.class
│   │   │           │   │   ├── VacationService.class
│   │   │           │   │   └── VacationServiceImpl.class
│   │   │           │   ├── Global
│   │   │           │   │   ├── EmailService.class
│   │   │           │   │   ├── EmailServiceImpl.class
│   │   │           │   │   ├── FileService.class
│   │   │           │   │   └── FileServiceImpl.class
│   │   │           │   ├── Reinscription
│   │   │           │   │   ├── AvisReinscriptionService.class
│   │   │           │   │   ├── AvisReinscriptionServiceImpl.class
│   │   │           │   │   ├── DemandeResincriptionService.class
│   │   │           │   │   └── DemandeResincriptionServiceImpl.class
│   │   │           │   └── utilisateurServices
│   │   │           │       ├── CandidatService.class
│   │   │           │       ├── CandidatServiceImpl.class
│   │   │           │       ├── ChefEquipeService.class
│   │   │           │       ├── ChefEquipeServiceImpl.class
│   │   │           │       ├── DirecteurDeTheseService.class
│   │   │           │       ├── DirecteurDeTheseServiceImpl.class
│   │   │           │       ├── LieuDeNaissanceService.class
│   │   │           │       ├── LieuDeNaissanceServiceImpl.class
│   │   │           │       ├── NationaliteService.class
│   │   │           │       ├── NationaliteServiceImpl.class
│   │   │           │       ├── ProfesseurService.class
│   │   │           │       ├── ProfesseurServiceImpl.class
│   │   │           │       ├── UtilisateurService.class
│   │   │           │       └── UtilisateurServiceImpl.class
│   │   │           └── web
│   │   │               ├── AttestationControllers
│   │   │               │   └── AttestationController.class
│   │   │               ├── authentication
│   │   │               │   └── AuthenticationController.class
│   │   │               ├── CandidatureControllers
│   │   │               │   ├── CandidatureController.class
│   │   │               │   └── SujetController.class
│   │   │               ├── DoctorantActionControllers
│   │   │               │   ├── ConfParticipationController.class
│   │   │               │   └── PublicationController.class
│   │   │               ├── FormationControllers
│   │   │               │   ├── FormationController.class
│   │   │               │   ├── SeanceFormationController.class
│   │   │               │   └── VacationController.class
│   │   │               ├── guest
│   │   │               │   └── guestController.class
│   │   │               ├── Logged
│   │   │               │   └── LoggedController.class
│   │   │               ├── Reinscription
│   │   │               │   ├── AvisReinscriptionController.class
│   │   │               │   └── DemandeReinscriptionController.class
│   │   │               └── Utilisateurs
│   │   │                   ├── ChefEquipeController.class
│   │   │                   ├── LieuDeNaissanceController.class
│   │   │                   ├── NationaliteController.class
│   │   │                   ├── ProfesseurController.class
│   │   │                   └── UtilisateurController.class
│   │   ├── reset_db.sql
│   │   └── static
│   │       └── images
│   │           └── Logo_inpt.png
│   ├── generated-sources
│   │   └── annotations
│   │       └── ma
│   │           └── inpt
│   │               └── cedoc
│   │                   └── model
│   │                       └── DTOs
│   │                           └── mapper
│   │                               └── AttestationsMappers
│   │                                   └── AttestationMapperImpl.java
│   ├── generated-test-sources
│   │   └── test-annotations
│   ├── maven-archiver
│   │   └── pom.properties
│   ├── maven-status
│   │   └── maven-compiler-plugin
│   │       ├── compile
│   │       │   └── default-compile
│   │       │       ├── createdFiles.lst
│   │       │       └── inputFiles.lst
│   │       └── testCompile
│   │           └── default-testCompile
│   │               ├── createdFiles.lst
│   │               └── inputFiles.lst
│   ├── surefire-reports
│   │   ├── ma.inpt.cedoc.CedocApplicationTests.txt
│   │   └── TEST-ma.inpt.cedoc.CedocApplicationTests.xml
│   └── test-classes
│       └── ma
│           └── inpt
│               └── cedoc
│                   └── CedocApplicationTests.class
└── TO_READ_BEFORE_STARTING.txt

190 directories, 575 files
.
├── backend.md
├── mvnw
├── mvnw.cmd
├── pom.xml
├── README.md
├── setup-secrets.sh
├── setup.cmd
├── src
│   ├── main
│   │   ├── java
│   │   │   └── ma
│   │   └── resources
│   │       ├── application-secrets.properties
│   │       ├── application-secrets.properties.example
│   │       ├── application.properties
│   │       ├── data_new.sql
│   │       ├── data.sql
│   │       ├── reset_db.sql
│   │       └── static
│   ├── test
│   │   └── java
│   │       └── ma
│   └── Uploads
└── TO_READ_BEFORE_STARTING.txt

11 directories, 14 files
