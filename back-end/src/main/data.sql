-- Insert data into `nationalites`
INSERT INTO nationalites (created_at, updated_at, intitule) VALUES
                                                                ('2025-04-19 12:00:00', '2025-04-19 12:00:00', 'Moroccan'),
                                                                ('2025-04-19 12:05:00', '2025-04-19 12:05:00', 'French'),
                                                                ('2025-04-19 12:10:00', '2025-04-19 12:10:00', 'American');

-- Insert data into `roles`
INSERT INTO roles (created_at, updated_at, intitule) VALUES
                                                         ('2025-04-19 12:00:00', '2025-04-19 12:00:00', 'Admin'),
                                                         ('2025-04-19 12:05:00', '2025-04-19 12:05:00', 'Utilisateur'),
                                                         ('2025-04-19 12:10:00', '2025-04-19 12:10:00', 'Candidat')
                                                        ,('2025-04-19 12:10:00', '2025-04-19 12:10:00', 'Professeur')
                                                         ,('2025-04-19 12:10:00', '2025-04-19 12:10:00', 'Doctorant');

-- Insert data into `sujets`
INSERT INTO sujets (created_at, updated_at, intitule, description) VALUES
                                                                       ('2025-04-19 12:00:00', '2025-04-19 12:00:00', 'AI in Medicine', 'Research on the application of AI in the medical field'),
                                                                       ('2025-04-19 12:05:00', '2025-04-19 12:05:00', 'Data Structures', 'An in-depth study of data structures and algorithms'),
                                                                       ('2025-04-19 12:10:00', '2025-04-19 12:10:00', 'Cloud Computing', 'Exploring cloud computing architectures and services');

-- Insert data into `utilisateurs`
INSERT INTO utilisateurs (email_valider, created_at, date_naissance, updated_at, telephone, nom, prenom, email, password, etat_civil, genre) VALUES
                                                                                                                                                 (1, '2025-04-19 12:00:00', '1995-05-15', '2025-04-19 12:05:00', '1234567890', 'Doe', 'John', 'john.doe@example.com', 'password123', 'Celibataire', 'Homme'),
                                                                                                                                                 (1, '2025-04-19 12:05:00', '1990-07-22', '2025-04-19 12:10:00', '0987654321', 'Smith', 'Jane', 'jane.smith@example.com', 'password456', 'Marrier', 'Femme');

-- Insert data into `utilisateur_roles`
INSERT INTO utilisateur_roles (role_id, utilisateur_id) VALUES
                                                            (1, 1),
                                                            (2, 2),
                                                            (3, 1);

-- Insert data into `candidatures`
INSERT INTO candidatures (created_at, id, updated_at, dossier_candidature, intitule_pfe, specialite, mention_bac, mention_diplome, statut_candidature, statut_professionnel, type_etablissement) VALUES
                                                                                                                                                                                                     ('2025-04-19 12:00:00', 1, '2025-04-19 12:05:00', 'C1', 'AI in Medicine', 'Computer Science', 'AB', 'B', 'ACCEPTER', 'NON_SALARIE', 'ECOLE'),
                                                                                                                                                                                                     ('2025-04-19 12:05:00', 2, '2025-04-19 12:10:00', 'C2', 'Data Structures', 'Software Engineering', 'TB', 'P', 'EN_COURS_DE_TRAITEMENT', 'SALARIE', 'UNIVERSITE');

-- Insert data into `candidature_accepter`
INSERT INTO candidature_accepter (date_entretien, id) VALUES
                                                          (20250421, 1),
                                                          (20250422, 2);

-- Insert data into `candidature_refuser`
INSERT INTO candidature_refuser (date_refus, id, motif) VALUES
    ('2025-04-19', 2, 'Insufficient experience');