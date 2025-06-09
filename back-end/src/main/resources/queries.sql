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

-- Insert base users
INSERT INTO utilisateurs (
    id, created_at, date_naissance, email, email_valider,
    etat_civil, genre, nom, password, prenom,
    statut_professionnel, telephone, updated_at,
    lieu_naissance_id, nationalite_id
) VALUES
-- Admin
(1, NOW(), '1980-01-15', 'admin@university.edu', TRUE, 'MARIER', 'HOMME', 'Admin', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'System', 'NON_SALARIE', '0612345678', NOW(), 1, 1),

-- Professors
(2, NOW(), '1975-05-20', 'prof1@university.edu', TRUE, 'MARIER', 'HOMME', 'Smith', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'John', 'NON_SALARIE', '0612345679', NOW(), 2, 2),
(3, NOW(), '1980-08-12', 'prof2@university.edu', TRUE, 'CELIBATAIRE', 'FEMME', 'Johnson', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Alice', 'NON_SALARIE', '0612345680', NOW(), 3, 1),
(4, NOW(), '1978-11-30', 'prof3@university.edu', TRUE, 'MARIER', 'HOMME', 'Williams', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Robert', 'NON_SALARIE', '0612345681', NOW(), 4, 3),
(5, NOW(), '1982-03-25', 'prof4@university.edu', TRUE, 'CELIBATAIRE', 'FEMME', 'Brown', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Emily', 'NON_SALARIE', '0612345682', NOW(), 5, 4),
(6, NOW(), '1970-07-18', 'prof5@university.edu', TRUE, 'DIVORCER', 'HOMME', 'Davis', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Michael', 'NON_SALARIE', '0612345683', NOW(), 6, 5),

-- Doctoral students
(7, NOW(), '1990-02-10', 'doc1@university.edu', TRUE, 'CELIBATAIRE', 'HOMME', 'Martin', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Thomas', 'NON_SALARIE', '0612345684', NOW(), 7, 1),
(8, NOW(), '1991-06-22', 'doc2@university.edu', TRUE, 'CELIBATAIRE', 'FEMME', 'Garcia', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Sophia', 'NON_SALARIE', '0612345685', NOW(), 8, 1),
(9, NOW(), '1989-09-15', 'doc3@university.edu', TRUE, 'MARIER', 'HOMME', 'Lee', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'David', 'NON_SALARIE', '0612345686', NOW(), 9, 2),
(10, NOW(), '1992-04-05', 'doc4@university.edu', TRUE, 'CELIBATAIRE', 'FEMME', 'Wilson', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Emma', 'NON_SALARIE', '0612345687', NOW(), 10, 1),
(11, NOW(), '1988-12-30', 'doc5@university.edu', TRUE, 'CELIBATAIRE', 'HOMME', 'Anderson', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'James', 'NON_SALARIE', '0612345688', NOW(), 1, 3),

-- Candidates
(12, NOW(), '1993-07-14', 'cand1@university.edu', TRUE, 'CELIBATAIRE', 'HOMME', 'Taylor', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'William', 'NON_SALARIE', '0612345689', NOW(), 2, 2),
(13, NOW(), '1994-01-25', 'cand2@university.edu', TRUE, 'CELIBATAIRE', 'FEMME', 'Moore', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Olivia', 'NON_SALARIE', '0612345690', NOW(), 3, 1),
(14, NOW(), '1992-10-08', 'cand3@university.edu', TRUE, 'CELIBATAIRE', 'HOMME', 'Jackson', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Benjamin', 'NON_SALARIE', '0612345691', NOW(), 4, 4),

-- Direction CEDOC
(15, NOW(), '1972-09-17', 'dir1@university.edu', TRUE, 'MARIER', 'HOMME', 'White', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Richard', 'NON_SALARIE', '0612345692', NOW(), 5, 1),
(16, NOW(), '1975-11-23', 'dir2@university.edu', TRUE, 'MARIER', 'FEMME', 'Harris', '$2a$10$5futZfOnSnlvLrzsdaAk2e7C3pY4M21bDsOlg8SeOs9tljT6UT0mS', 'Jennifer', 'NON_SALARIE', '0612345693', NOW(), 6, 2);

-- Assign roles to users
INSERT INTO utilisateur_roles (utilisateur_id, role_id) VALUES
                                                            (1, 1), (2, 2), (3, 2), (4, 2), (5, 2), (6, 2),
                                                            (7, 3), (8, 3), (9, 3), (10, 3), (11, 3),
                                                            (12, 4), (13, 4), (14, 4),
                                                            (15, 5), (16, 5);

-- Insert professors
INSERT INTO professeurs (utilisateur_id, grade, equipe_de_recherche_id) VALUES
                                                                            (2, 'PES', NULL),
                                                                            (3, 'HABILITE', NULL),
                                                                            (4, 'PES', NULL),
                                                                            (5, 'HABILITE', NULL),
                                                                            (6, 'ASSISTANT', NULL);

-- Role-specific roles
INSERT INTO chef_equipe_roles (professeur_id) VALUES (2), (3);
INSERT INTO directeur_de_these_roles (professeur_id) VALUES (4), (5);
INSERT INTO responsable_de_formation_roles (professeur_id) VALUES (6);

-- Research teams
INSERT INTO equipes_de_recherches (id, created_at, nom_de_equipe, updated_at, chef_equipe_id) VALUES
                                                                                                  (1, NOW(), 'Informatique Théorique', NOW(), 2),
                                                                                                  (2, NOW(), 'Intelligence Artificielle', NOW(), 3);

-- Update profs with teams
UPDATE professeurs SET equipe_de_recherche_id = 1 WHERE utilisateur_id = 2;
UPDATE professeurs SET equipe_de_recherche_id = 2 WHERE utilisateur_id = 3;
UPDATE professeurs SET equipe_de_recherche_id = 2 WHERE utilisateur_id = 4;
UPDATE professeurs SET equipe_de_recherche_id = 1 WHERE utilisateur_id = 5;
UPDATE professeurs SET equipe_de_recherche_id = 2 WHERE utilisateur_id = 6;

-- Direction CEDOC
INSERT INTO direction_cedoc (utilisateur_id, role_administrative) VALUES
                                                                      (15, 'DIRECTEUR'),
                                                                      (16, 'RESPONSABLE');

-- Candidates
INSERT INTO candidats (utilisateur_id, archiver) VALUES
                                                     (12, FALSE), (13, FALSE), (14, FALSE);

-- Doctorants
INSERT INTO doctorants (
    utilisateur_id, nombre_heures_labo, archiver,
    date_inscription, draft_diplome_url, statut_doctorant,
    directeur_role_id, equipe_de_recherche_id, sujet_id
) VALUES
      (7, 20, FALSE, '2020-09-01', NULL, 'EN_COURS', 4, 1, NULL),
      (8, 15, FALSE, '2021-09-01', NULL, 'EN_COURS', 5, 2, NULL),
      (9, 25, FALSE, '2019-09-01', NULL, 'SOUTENANCE_PROGRAMMER', 4, 1, NULL),
      (10, 18, FALSE, '2022-09-01', NULL, 'EN_COURS', 5, 1, NULL),
      (11, 30, FALSE, '2018-09-01', NULL, 'LAUREAT', 4, 2, NULL);

-- Sujets
INSERT INTO sujets (
    id, created_at, description, est_public,
    intitule, updated_at, est_valide,
    chef_equipe_role_id, directeur_these_role_id
) VALUES
      (1, NOW(), 'Optimisation des algorithmes de recherche en IA', TRUE, 'Optimisation IA', NOW(), TRUE, 2, 4),
      (2, NOW(), 'Sécurité dans les systèmes distribués', TRUE, 'Sécurité distribuée', NOW(), TRUE, 3, 5),
      (3, NOW(), 'Apprentissage automatique pour la reconnaissance d''images', TRUE, 'ML pour vision', NOW(), TRUE, 2, 4),
      (4, NOW(), 'Architectures microservices pour le cloud', TRUE, 'Microservices cloud', NOW(), TRUE, 3, 5);
