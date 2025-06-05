-- Insert nationalities
INSERT INTO nationalites (id, created_at, intitule, updated_at) VALUES
(1, NOW(), 'Marocaine', NOW()),
(2, NOW(), 'Française', NOW()),
(3, NOW(), 'Algérienne', NOW()),
(4, NOW(), 'Tunisienne', NOW()),
(5, NOW(), 'Sénégalaise', NOW());

-- Insert birth places
INSERT INTO lieux_de_naissances (id, created_at, pays, ville, updated_at) VALUES
(1, NOW(), 'Maroc', 'Casablanca', NOW()),
(2, NOW(), 'France', 'Paris', NOW()),
(3, NOW(), 'Maroc', 'Rabat', NOW()),
(4, NOW(), 'Algérie', 'Alger', NOW()),
(5, NOW(), 'Tunisie', 'Tunis', NOW()),
(6, NOW(), 'Sénégal', 'Dakar', NOW()),
(7, NOW(), 'Maroc', 'Fès', NOW()),
(8, NOW(), 'Maroc', 'Marrakech', NOW()),
(9, NOW(), 'France', 'Lyon', NOW()),
(10, NOW(), 'Maroc', 'Tanger', NOW());

-- Insert roles
INSERT INTO roles (id, created_at, intitule, updated_at) VALUES
(1, NOW(), 'ADMIN', NOW()),
(2, NOW(), 'PROFESSEUR', NOW()),
(3, NOW(), 'DOCTORANT', NOW()),
(4, NOW(), 'CANDIDAT', NOW()),
(5, NOW(), 'DIRECTION_CEDOC', NOW()),
(6, NOW(), 'CHEF_EQUIPE', NOW()),
(7, NOW(), 'DIRECTEUR_THESE', NOW()),
(8, NOW(), 'RESPONSABLE_FORMATION', NOW());

-- Insert base users with hashed passwords
-- All passwords are hashed with bcrypt (cost factor 10)
-- Plaintext password for all test users: "Test@1234"
-- Hashed: $2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG
INSERT INTO utilisateurs (id, created_at, date_naissance, email, email_valider, etat_civil, genre, nom, password, prenom, statut_professionnel, telephone, updated_at, lieu_naissance_id, nationalite_id) VALUES
-- Admin
(1, NOW(), '1980-01-15', 'admin@university.edu', 1, 'MARIER', 'HOMME', 'Admin', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'System', 'NON_SALARIE', '0612345678', NOW(), 1, 1),

-- Professors
(2, NOW(), '1975-05-20', 'prof1@university.edu', 1, 'MARIER', 'HOMME', 'Smith', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'John', 'NON_SALARIE', '0612345679', NOW(), 2, 2),
(3, NOW(), '1980-08-12', 'prof2@university.edu', 1, 'CELIBATAIRE', 'FEMME', 'Johnson', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Alice', 'NON_SALARIE', '0612345680', NOW(), 3, 1),
(4, NOW(), '1978-11-30', 'prof3@university.edu', 1, 'MARIER', 'HOMME', 'Williams', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Robert', 'NON_SALARIE', '0612345681', NOW(), 4, 3),
(5, NOW(), '1982-03-25', 'prof4@university.edu', 1, 'CELIBATAIRE', 'FEMME', 'Brown', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Emily', 'NON_SALARIE', '0612345682', NOW(), 5, 4),
(6, NOW(), '1970-07-18', 'prof5@university.edu', 1, 'DIVORCER', 'HOMME', 'Davis', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Michael', 'NON_SALARIE', '0612345683', NOW(), 6, 5),

-- Doctoral students
(7, NOW(), '1990-02-10', 'doc1@university.edu', 1, 'CELIBATAIRE', 'HOMME', 'Martin', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Thomas', 'NON_SALARIE', '0612345684', NOW(), 7, 1),
(8, NOW(), '1991-06-22', 'doc2@university.edu', 1, 'CELIBATAIRE', 'FEMME', 'Garcia', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Sophia', 'NON_SALARIE', '0612345685', NOW(), 8, 1),
(9, NOW(), '1989-09-15', 'doc3@university.edu', 1, 'MARIER', 'HOMME', 'Lee', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'David', 'NON_SALARIE', '0612345686', NOW(), 9, 2),
(10, NOW(), '1992-04-05', 'doc4@university.edu', 1, 'CELIBATAIRE', 'FEMME', 'Wilson', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Emma', 'NON_SALARIE', '0612345687', NOW(), 10, 1),
(11, NOW(), '1988-12-30', 'doc5@university.edu', 1, 'CELIBATAIRE', 'HOMME', 'Anderson', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'James', 'NON_SALARIE', '0612345688', NOW(), 1, 3),

-- Candidates
(12, NOW(), '1993-07-14', 'cand1@university.edu', 1, 'CELIBATAIRE', 'HOMME', 'Taylor', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'William', 'NON_SALARIE', '0612345689', NOW(), 2, 2),
(13, NOW(), '1994-01-25', 'cand2@university.edu', 1, 'CELIBATAIRE', 'FEMME', 'Moore', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Olivia', 'NON_SALARIE', '0612345690', NOW(), 3, 1),
(14, NOW(), '1992-10-08', 'cand3@university.edu', 1, 'CELIBATAIRE', 'HOMME', 'Jackson', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Benjamin', 'NON_SALARIE', '0612345691', NOW(), 4, 4),

-- Direction CEDOC
(15, NOW(), '1972-09-17', 'dir1@university.edu', 1, 'MARIER', 'HOMME', 'White', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Richard', 'NON_SALARIE', '0612345692', NOW(), 5, 1),
(16, NOW(), '1975-11-23', 'dir2@university.edu', 1, 'MARIER', 'FEMME', 'Harris', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Jennifer', 'NON_SALARIE', '0612345693', NOW(), 6, 2);

-- Assign roles to users
INSERT INTO utilisateur_roles (utilisateur_id, role_id) VALUES
-- Admin
(1, 1),

-- Professors
(2, 2), (3, 2), (4, 2), (5, 2), (6, 2),

-- Doctoral students
(7, 3), (8, 3), (9, 3), (10, 3), (11, 3),

-- Candidates
(12, 4), (13, 4), (14, 4),

-- Direction CEDOC
(15, 5), (16, 5);

-- Insert professors
INSERT INTO professeurs (grade, id, equipe_de_recherche_id) VALUES
('PES', 2, NULL),
('HABILITE', 3, NULL),
('PES', 4, NULL),
('HABILITE', 5, NULL),
('ASSISTANT', 6, NULL);

-- Insert research teams
INSERT INTO equipes_de_recherches (id, created_at, nom_de_equipe, updated_at, chef_equipe_role_id) VALUES
(1, NOW(), 'Informatique Théorique', NOW(), NULL),
(2, NOW(), 'Intelligence Artificielle', NOW(), NULL),
(3, NOW(), 'Systèmes Distribués', NOW(), NULL);

-- Insert role-specific professor tables
INSERT INTO chef_equipe_roles (professeur_id) VALUES (2), (3);
INSERT INTO directeur_de_these_roles (professeur_id) VALUES (4), (5);
INSERT INTO responsable_de_formation_roles (professeur_id) VALUES (6);

-- Update research teams with their leaders
UPDATE equipes_de_recherches SET chef_equipe_role_id = 2 WHERE id = 1;
UPDATE equipes_de_recherches SET chef_equipe_role_id = 3 WHERE id = 2;

-- Update professors with research teams
UPDATE professeurs SET equipe_de_recherche_id = 1 WHERE id = 2;
UPDATE professeurs SET equipe_de_recherche_id = 2 WHERE id = 3;
UPDATE professeurs SET equipe_de_recherche_id = 3 WHERE id = 4;
UPDATE professeurs SET equipe_de_recherche_id = 1 WHERE id = 5;
UPDATE professeurs SET equipe_de_recherche_id = 2 WHERE id = 6;

-- Insert direction cedoc
INSERT INTO direction_cedoc (role_administrative, id) VALUES
('DIRECTEUR', 15),
('RESPONSABLE', 16);

-- Insert candidates
INSERT INTO candidats (archiver, id) VALUES
(0, 12), (0, 13), (0, 14);

-- Insert doctoral students
INSERT INTO doctorants (nombre_heures_labo, archiver, date_inscription, draft_diplome_url, statut_doctorant, id, directeur_role_id, equipe_de_recherche_id, sujet_id) VALUES
(20, 0, '2020-09-01', NULL, 'EN_COURS', 7, 4, 1, NULL),
(15, 0, '2021-09-01', NULL, 'EN_COURS', 8, 5, 2, NULL),
(25, 0, '2019-09-01', NULL, 'SOUTENANCE_PROGRAMMER', 9, 4, 3, NULL),
(18, 0, '2022-09-01', NULL, 'EN_COURS', 10, 5, 1, NULL),
(30, 0, '2018-09-01', NULL, 'LAUREAT', 11, 4, 2, NULL);

-- Insert research subjects
INSERT INTO sujets (id, created_at, description, est_public, intitule, updated_at, est_valide, chef_equipe_role_id, directeur_these_role_id) VALUES
(1, NOW(), 'Optimisation des algorithmes de recherche en IA', 1, 'Optimisation IA', NOW(), 1, 2, 4),
(2, NOW(), 'Sécurité dans les systèmes distribués', 1, 'Sécurité distribuée', NOW(), 1, 3, 5),
(3, NOW(), 'Apprentissage automatique pour la reconnaissance d\'images', 1, 'ML pour vision', NOW(), 1, 2, 4),
(4, NOW(), 'Architectures microservices pour le cloud', 1, 'Microservices cloud', NOW(), 1, 3, 5),
(5, NOW(), 'Algorithmes quantiques pour la cryptographie', 0, 'Cryptographie quantique', NOW(), 0, 2, NULL);

-- Update doctoral students with their subjects
UPDATE doctorants SET sujet_id = 1 WHERE id = 7;
UPDATE doctorants SET sujet_id = 2 WHERE id = 8;
UPDATE doctorants SET sujet_id = 3 WHERE id = 9;
UPDATE doctorants SET sujet_id = 4 WHERE id = 10;
UPDATE doctorants SET sujet_id = 5 WHERE id = 11;

-- Link professors to subjects
INSERT INTO sujets_professeurs (sujet_id, professeur_id) VALUES
(1, 2), (1, 3),
(2, 3), (2, 4),
(3, 2), (3, 5),
(4, 3), (4, 6),
(5, 2);

-- Insert formations
INSERT INTO formations (id, created_at, date_debut, duree, formation_name, intitule, lieu, module, nom_formateur, updated_at, professeur_id) VALUES
(1, NOW(), NOW(), 30, 'Deep Learning Avancé', 'Formation approfondie en réseaux neuronaux', 'Labo 1', 'INFORMATIQUE', 'Dr. Smith', NOW(), 2),
(2, NOW(), DATE_ADD(NOW(), INTERVAL 1 WEEK), 20, 'Sécurité Cloud', 'Sécurité des applications cloud natives', 'Labo 2', 'INFORMATIQUE', 'Prof. Johnson', NOW(), 3),
(3, NOW(), DATE_ADD(NOW(), INTERVAL 2 WEEK), 15, 'Méthodologie de Recherche', 'Méthodes scientifiques et rédaction académique', 'Salle 101', 'SCIENCES', 'Dr. Williams', NOW(), 4);

-- Link doctoral students to formations
INSERT INTO doctorant_formation (formation_id, doctorant_id) VALUES
(1, 7), (1, 8),
(2, 7), (2, 9), (2, 10),
(3, 8), (3, 11);

-- Insert formation sessions
INSERT INTO seances_formations (id, created_at, duree, justificatif_pdf, statut, updated_at, doctorant_id, formation_id, responsable_id) VALUES
(1, NOW(), 3, 'justificatif1.pdf', 'VALIDER', NOW(), 7, 1, 6),
(2, NOW(), 3, 'justificatif2.pdf', 'DECLARER', NOW(), 8, 1, 6),
(3, NOW(), 2, 'justificatif3.pdf', 'VALIDER', NOW(), 9, 2, 6),
(4, NOW(), 2, 'justificatif4.pdf', 'REFUSER', NOW(), 10, 2, 6),
(5, NOW(), 4, 'justificatif5.pdf', 'VALIDER', NOW(), 11, 3, 6);

-- Insert candidatures
INSERT INTO candidatures (id, created_at, diplome, dossier_candidature, intitule_pfe, mention_bac, mention_diplome, specialite, statut_candidature, type_etablissement, updated_at, candidat_id) VALUES
(1, NOW(), 'MASTER', 'dossier1.pdf', 'Système de recommandation', 'B', 'TB', 'Informatique', 'SOUMISE', 'UNIVERSITE', NOW(), 12),
(2, NOW(), 'INGENIEUR', 'dossier2.pdf', 'Analyse de sentiments', 'TB', 'B', 'Data Science', 'EN_COURS_DE_TRAITEMENT', 'ECOLE', NOW(), 13),
(3, NOW(), 'MASTER', 'dossier3.pdf', 'Blockchain pour la santé', 'AB', 'AB', 'Cryptographie', 'ACCEPTER', 'UNIVERSITE', NOW(), 14);

-- Link candidatures to subjects
INSERT INTO candidature_sujets (candidature_id, sujet_id) VALUES
(1, 1), (1, 2),
(2, 3),
(3, 4), (3, 5);

-- Insert accepted candidatures
INSERT INTO candidatures_accepter (date_entretien, id) VALUES
    (15, 3);

-- Insert rejected candidatures
INSERT INTO candidatures_refuser (date_refus, motif, id) VALUES
    ('2023-01-15', 'Dossier incomplet', 2);

-- Insert attestations
INSERT INTO attestations_seq (next_val) VALUES (1);
INSERT INTO attestations (type_attestation, id, created_at, date_demande, doctorant_id, statut_attestation, updated_at, url, type_attestation_auto, etat_attestation_validation, type_attestation_validation) VALUES
('AUTO', 1, NOW(), NOW(), 7, 'AUTOMATIQUE', NOW(), 'attestation1.pdf', 'INSCRIPTION', NULL, NULL),
('AUTO', 2, NOW(), NOW(), 8, 'AUTOMATIQUE', NOW(), 'attestation2.pdf', 'TRAVAIL', NULL, NULL),
('VALIDATION', 3, NOW(), NOW(), 9, 'NECESSITE_VALIDATION', NOW(), NULL, NULL, 'EN_ATTENTE', 'SOUTENANCE'),
('VALIDATION', 4, NOW(), NOW(), 10, 'NECESSITE_VALIDATION', NOW(), NULL, NULL, 'VALIDEE', 'AUTORISATION_DE_LA_SOUTENANCE');

-- Insert demandes_attestions
INSERT INTO demandes_attestions_seq (next_val) VALUES (1);
INSERT INTO demandes_attestions (id, created_at, date_demande, statut_demande_att, updated_at, attestation_id, doctorant_id) VALUES
    (1, NOW(), '2023-01-10', 'AUTOMATIQUE', NOW(), 1, 7),
    (2, NOW(), '2023-01-15', 'AUTOMATIQUE', NOW(), 2, 8),
    (3, NOW(), '2023-02-01', 'NECESSITE_VALIDATION', NOW(), 3, 9),
    (4, NOW(), '2023-02-10', 'NECESSITE_VALIDATION', NOW(), 4, 10);

-- Insert demandes_reinscriptions
INSERT INTO demandes_reinscriptions (id, certificat_travail, annee, attestation_honneur, created_at, demande_derogation, plan_action, rapport_avancement, residance, status, updated_at, direction_cedoc_id, chef_equipe_id, doctorant_id, sujet_id) VALUES
(1, 'certificat1.pdf', 2023, 'attestation1.pdf', NOW(), 'derogation1.pdf', 'plan1.pdf', 'rapport1.pdf', 1, 1, NOW(), 15, 2, 7, 1),
(2, 'certificat2.pdf', 2023, 'attestation2.pdf', NOW(), 'derogation2.pdf', 'plan2.pdf', 'rapport2.pdf', 0, 2, NOW(), 16, 3, 8, 2),
(3, 'certificat3.pdf', 2023, 'attestation3.pdf', NOW(), 'derogation3.pdf', 'plan3.pdf', 'rapport3.pdf', 1, 1, NOW(), 15, 2, 9, 3);

-- Insert avis_reinscriptions
INSERT INTO avis_reinscriptions (id, avis_final, created_at, etat_avancement, observation, updated_at, demande_reinscription_id, directeur_role_id) VALUES
(1, 'FAVORABLE', NOW(), 'BIEN', 'Bon avancement', NOW(), 1, 4),
(2, 'NON_FAVORABLE', NOW(), 'INSUFFISANT', 'Progrès insuffisants', NOW(), 2, 5),
(3, 'FAVORABLE', NOW(), 'MOYEN', 'Avancement moyen mais acceptable', NOW(), 3, 4);

-- Insert soutenances
INSERT INTO soutenances (id, created_at, date_soutenance, location, statut_soutenance, updated_at) VALUES
(1, NOW(), '2023-06-15', 'Amphi A', 'REUSSI', NOW()),
(2, NOW(), '2023-07-20', 'Salle 201', 'NON_REUSSI', NOW()),
(3, NOW(), '2023-09-10', 'Amphi B', 'REUSSI', NOW());

-- Insert demandes_soutenances
INSERT INTO demandes_soutenances (id, created_at, memoire_de_these, statut_demande, updated_at, directeur_role_id, direction_cedoc_id, soutenance_id) VALUES
(1, NOW(), 'memoire1.pdf', 'ACCEPTER', NOW(), 4, 15, 1),
(2, NOW(), 'memoire2.pdf', 'AJOURNEE', NOW(), 5, 16, 2),
(3, NOW(), 'memoire3.pdf', 'ACCEPTER', NOW(), 4, 15, 3);

-- Insert jury
INSERT INTO jury (id, created_at, updated_at, directeur_role_id, direction_cedoc_id) VALUES
(1, NOW(), NOW(), 4, 15),
(2, NOW(), NOW(), 5, 16),
(3, NOW(), NOW(), 4, 15);

-- Insert roles_jury
INSERT INTO roles_jury (id, created_at, role, updated_at, jury_id, professeur_id) VALUES
(1, NOW(), 'PRESIDENT', NOW(), 1, 2),
(2, NOW(), 'RAPPORTEUR', NOW(), 1, 3),
(3, NOW(), 'EXAMINATEUR', NOW(), 1, 4),
(4, NOW(), 'PRESIDENT', NOW(), 2, 3),
(5, NOW(), 'RAPPORTEUR', NOW(), 2, 5),
(6, NOW(), 'EXAMINATEUR', NOW(), 2, 6),
(7, NOW(), 'PRESIDENT', NOW(), 3, 2),
(8, NOW(), 'RAPPORTEUR', NOW(), 3, 5),
(9, NOW(), 'EXAMINATEUR', NOW(), 3, 6);

-- Insert communications_conferences
INSERT INTO communications_conferences (id, autres_participants, conference, created_at, date, justificatif, lieu, status, titre, updated_at, participant_id, validateur_id) VALUES
(1, 'Dr. X, Prof. Y', 'Conférence Internationale IA', NOW(), '2022-11-15', 'justificatif1.pdf', 'Paris', 'VALIDE', 'Nouvelles approches en ML', NOW(), 7, 15),
(2, NULL, 'Symposium Sécurité Info', NOW(), '2023-01-20', 'justificatif2.pdf', 'Lyon', 'DECLAREE', 'Vulnérabilités Zero-Day', NOW(), 8, NULL),
(3, 'Prof. Z', 'Workshop Cloud Computing', NOW(), '2022-09-10', 'justificatif3.pdf', 'Casablanca', 'REFUSEE', 'Optimisation des coûts Cloud', NOW(), 9, 16);

-- Insert publications
INSERT INTO publications (id, autres_auteurs, created_at, date_publication, journal, justificatif, prix_intitule, status, titre, updated_at, auteur, validateur_id) VALUES
(1, 'Dr. A, Prof. B', NOW(), '2022-06-01', 'Journal of AI Research', 'justificatif1.pdf', NULL, 'VALIDE', 'Deep Learning for Medical Diagnosis', NOW(), 7, 15),
(2, NULL, NOW(), '2023-01-15', 'Security Journal', 'justificatif2.pdf', 'Best Paper Award', 'DECLAREE', 'New Encryption Protocols', NOW(), 8, NULL),
(3, 'Prof. C', NOW(), '2022-08-20', 'Cloud Computing Review', 'justificatif3.pdf', NULL, 'REFUSEE', 'Serverless Architectures', NOW(), 9, 16);

-- Insert vacations
INSERT INTO vacations (id, created_at, date, duree, etablissement, justificatif, niveau, statut, titre_du_cours, updated_at, doctorant_id) VALUES
(1, NOW(), '2022-10-10', 2, 'ENSA', 'justificatif1.pdf', 'Master', 'VALIDER', 'Introduction à l\'IA', NOW(), 7),
(2, NOW(), '2023-02-15', 3, 'FST', 'justificatif2.pdf', 'Licence', 'DECLARER', 'Sécurité des systèmes', NOW(), 8),
(3, NOW(), '2022-12-05', 1, 'ENCG', 'justificatif3.pdf', 'Master', 'REFUSER', 'Cloud Computing', NOW(), 9);