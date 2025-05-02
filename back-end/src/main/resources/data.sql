-- Active: 1746060441633@@127.0.0.1@3306@cedoc_db
-- ROLES
INSERT INTO roles (intitule) VALUES 
('CANDIDAT'),
('PROFESSEUR'),
('DOCTORANT'),
('CHEF_EQUIPE'),
('RESPONSABLE_FORMATION'),
('DIRECTEUR_THESE'),
('DIRECTION_CEDOC');

-- LIEU DE NAISSANCE
INSERT INTO lieux_de_naissances (ville, pays) VALUES 
('Rabat', 'Maroc'),
('Tunis', 'Tunisie'),
('Paris', 'France');

-- NATIONALITES
INSERT INTO nationalites (intitule) VALUES 
('Marocaine'),
('Tunisienne'),
('Française');

-- UTILISATEURS (base table for joined inheritance)
-- bcrypt hash of 'password' is: $2a$10$E6R/NMoyKoD1HimOFR8n7OanS9rROvbyHOXg1oE8gfEBylL5TNN.q
INSERT INTO utilisateurs (
    nom, prenom, genre, telephone, email, date_de_naissance, mot_de_passe,
    etat_civil, email_valide, role_id, lieu_de_naissance_id, nationalite_id
) VALUES 
-- Candidat
('ElMansouri', 'Khadija', 'FEMME', '+212612345678', 'khadija@example.com', '1998-03-12','$2a$10$E6R/NMoyKoD1HimOFR8n7OanS9rROvbyHOXg1oE8gfEBylL5TNN.q', 'CELIBATAIRE', TRUE, 1, 1, 1),

-- Professeur
('Bennani', 'Youssef', 'M', '0611122233', 'youssef@example.com', '1975-11-23',
 '$2a$10$E6R/NMoyKoD1HimOFR8n7OanS9rROvbyHOXg1oE8gfEBylL5TNN.q', 'MARIE', TRUE, 2, 2, 1),

-- Doctorant
('Alaoui', 'Salma', 'F', '0677889900', 'salma@example.com', '1995-06-15',
 '$2a$10$E6R/NMoyKoD1HimOFR8n7OanS9rROvbyHOXg1oE8gfEBylL5TNN.q', 'CELIBATAIRE', TRUE, 3, 3, 3);

-- CANDIDAT
INSERT INTO candidats (id, archiver) VALUES 
(1, FALSE);

-- PROFESSEUR
INSERT INTO professeurs (id, grade) VALUES 
(2, 'PES');

-- DOCTORANT
INSERT INTO doctorants (id, date_inscription, statut_doctorant, nbr_heures_labo, draft_diplome_url, archiver) VALUES 
(3, '2023-09-01', 'EN_COURS', 100, 'http://example.com/draft.pdf', FALSE);

-- CHEF EQUIPE (as specialization of PROFESSEUR)
INSERT INTO chefs_equipes (id) VALUES 
(2);

-- RESPONSABLE DE FORMATION
INSERT INTO responsables_de_formations (id) VALUES 
(2);

-- DIRECTEUR DE THESE
INSERT INTO directeurs_de_theses (id) VALUES 
(2);

-- DIRECTION CEDOC
INSERT INTO direction_cedoc (id, role_administrative) VALUES 
(2, 'DIRECTEUR');
