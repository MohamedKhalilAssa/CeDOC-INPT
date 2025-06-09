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
-- bcrypt hash of 'Password' 
INSERT INTO `utilisateurs`(
    `created_at`,
    `date_naissance`,
    `email`,
    `email_valider`,
    `etat_civil`,
    `genre`,
    `nom`,
    `password`,
    `prenom`,
    `telephone`,
    `updated_at`,
    `lieu_naissance_id`,
    `nationalite_id`
) VALUES 
-- Candidat
(
    NOW(),
    '1998-04-15',
    'ali.bensalah@example.com',
    1,  -- TRUE for email validated
    'CELIBATAIRE',
    'HOMME',
    'Ben Salah',
    '$2a$04$5y7HHz04OMpFAukUrfRWl.pXzj4GmaOJ9PqLkktT3TgjSR9Py/VCK',
    'Ali',
    '+212612345678',
    NOW(),
    1,
    1
),
-- Professeur
(
    NOW(),
    '1992-11-03',
    'fatima.ouahbi@example.com',
    0,  -- FALSE for email not validated
    'MARIER',
    'FEMME',
    'Ouahbi',
    '$2a$04$5y7HHz04OMpFAukUrfRWl.pXzj4GmaOJ9PqLkktT3TgjSR9Py/VCK',
    'Fatima',
    '+212698745632',
    NOW(),
    2,
    2
),
-- Doctorant
(
    NOW(),
    '1985-06-27',
    'yacine.elhassani@example.com',
    1,  -- TRUE for email validated
    'CELIBATAIRE',
    'HOMME',
    'El Hassani',
    '$2a$04$5y7HHz04OMpFAukUrfRWl.pXzj4GmaOJ9PqLkktT3TgjSR9Py/VCK',
    'Yacine',
    '+212677889900',
    NOW(),
    3,
    3
);

-- CANDIDAT
INSERT INTO candidats (id, archiver) VALUES 
(3, FALSE);

-- PROFESSEUR
INSERT INTO professeurs (id, grade) VALUES 
(2, 'PES');
INSERT INTO utilisateur_roles (utilisateur_id, role_id) VALUES 
(2, 2);
-- DOCTORANT
INSERT INTO doctorants (id, date_inscription, statut_doctorant, nombre_heures_labo, draft_diplome_url, archiver) VALUES 
(1, '2023-09-01', 'EN_COURS', 100, 'http://example.com/draft.pdf', FALSE);

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
