-- Active: 1746060441633@@127.0.0.1@3306@cedoc_db
-- ROLES
INSERT INTO roles (intitule) VALUES 
('CANDIDAT'),
('PROFESSEUR'),
('DOCTORANT'),
('CHEF_EQUIPE'),
('RESPONSABLE_FORMATION'),
('DIRECTEUR_DE_THESE'),
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
-- Professeur Fatima (will have multiple roles)
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
(1, FALSE);

-- PROFESSEUR
INSERT INTO professeurs (id, grade) VALUES 
(2, 'PES');  -- Single professor with multiple roles

INSERT INTO utilisateur_roles (utilisateur_id, role_id) VALUES 
(1, 1),  -- Candidat role
(2, 2),  -- Base professeur role
(2, 4),  -- ChefEquipe role
(2, 6),  -- DirecteurDeThese role
(2, 5),  -- ResponsableDeFormation role
(2, 7),  -- DirectionCedoc role
(3, 3);  -- Doctorant role

-- DOCTORANT
INSERT INTO doctorants (id, date_inscription, statut_doctorant, nombre_heures_labo, draft_diplome_url, archiver) VALUES 
(3, '2023-09-01', 'EN_COURS', 100, 'http://example.com/draft.pdf', FALSE);

-- Role entities for composition approach
INSERT INTO chef_equipe_roles (professeur_id) VALUES 
(2);  -- Professeur ID 2 has Chef Equipe role

INSERT INTO directeur_de_these_roles (professeur_id) VALUES 
(2);  -- Professeur ID 2 has Directeur de These role

INSERT INTO responsable_de_formation_roles (professeur_id) VALUES 
(2);  -- Professeur ID 2 has Responsable de Formation role

-- DIRECTION CEDOC
INSERT INTO direction_cedoc (id, role_administrative) VALUES 
(2, 'DIRECTEUR');  -- Using professor ID 2 for DirectionCedoc role

-- EQUIPE DE RECHERCHE
INSERT INTO equipes_de_recherches (intitule, description, chef_equipe_role_id) VALUES 
('Intelligence Artificielle et Data Science', 'Équipe spécialisée dans l\'IA et l\'analyse de données', 1);

-- SUJETS with corrected role references
INSERT INTO sujets (
    intitule,
    description,
    est_valide,
    est_public,
    created_at,
    updated_at,
    chef_equipe_role_id,
    directeur_these_role_id
) VALUES
('Analyse des données massives', 'Étude approfondie des techniques de traitement de Big Data.', true, true, NOW(), NOW(), 2, 2),
('Sécurité des systèmes embarqués', 'Recherche sur la cybersécurité dans les systèmes embarqués modernes.', false, true, NOW(), NOW(), 2, 2),
('Apprentissage automatique distribué', 'Optimisation des algorithmes de machine learning à grande échelle.', true, false, NOW(), NOW(), 2, 2),
('Systèmes autonomes intelligents', 'Conception de systèmes auto-adaptatifs pour la robotique.', false, false, NOW(), NOW(), 2, 2),
('Réseaux de neurones profonds', 'Amélioration de la performance des modèles de deep learning.', true, true, NOW(), NOW(), 2, 2),
('Vision par ordinateur avancée', 'Détection d’objets en temps réel dans les flux vidéo.', false, true, NOW(), NOW(), 2, 2),
('IoT et agriculture intelligente', 'Applications de l’internet des objets dans l’agriculture de précision.', true, true, NOW(), NOW(), 2, 2),
('Cloud Computing pour le calcul scientifique', 'Déploiement de modèles scientifiques sur le cloud.', false, false, NOW(), NOW(), 2, 2),
('Traitement du langage naturel en arabe', 'Développement de modèles NLP pour la langue arabe.', true, false, NOW(), NOW(), 2, 2),
('Blockchain et traçabilité alimentaire', 'Utilisation de la blockchain pour le suivi des produits agricoles.', false, true, NOW(), NOW(), 2, 2);
