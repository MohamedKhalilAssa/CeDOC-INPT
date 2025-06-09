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
-- Professeur (base)
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
-- Fatima as ChefEquipe (separate entity instance)
(
    NOW(),
    '1992-11-03',
    'fatima.ouahbi+chef@example.com',
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
-- Fatima as DirecteurDeThese (separate entity instance)  
(
    NOW(),
    '1992-11-03',
    'fatima.ouahbi+directeur@example.com',
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
-- Fatima as ResponsableDeFormation (separate entity instance)
(
    NOW(),
    '1992-11-03',
    'fatima.ouahbi+responsable@example.com',
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
-- Fatima as DirectionCedoc (separate entity instance)
(
    NOW(),
    '1992-11-03',
    'fatima.ouahbi+direction@example.com',
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
(2, 'PES'),
(3, 'PES'),  -- ChefEquipe role
(4, 'PES'),  -- DirecteurDeThese role  
(5, 'PES'),  -- ResponsableDeFormation role
(6, 'PES');  -- DirectionCedoc role

INSERT INTO utilisateur_roles (utilisateur_id, role_id) VALUES 
(1, 1),  -- Candidat role
(2, 2),  -- Base professeur role
(3, 2),  -- Professeur role for ChefEquipe
(3, 4),  -- ChefEquipe role
(4, 2),  -- Professeur role for DirecteurDeThese
(4, 6),  -- DirecteurDeThese role
(5, 2),  -- Professeur role for ResponsableDeFormation
(5, 5),  -- ResponsableDeFormation role
(6, 2),  -- Professeur role for DirectionCedoc
(6, 7),  -- DirectionCedoc role
(7, 3);  -- Doctorant role

-- DOCTORANT
INSERT INTO doctorants (id, date_inscription, statut_doctorant, nombre_heures_labo, draft_diplome_url, archiver) VALUES 
(7, '2023-09-01', 'EN_COURS', 100, 'http://example.com/draft.pdf', FALSE);

-- Role entities for composition approach
INSERT INTO chef_equipe_roles (professeur_id) VALUES 
(3);  -- Professeur ID 3 has Chef Equipe role

INSERT INTO directeur_de_these_roles (professeur_id) VALUES 
(4);  -- Professeur ID 4 has Directeur de These role

INSERT INTO responsable_de_formation_roles (professeur_id) VALUES 
(5);  -- Professeur ID 5 has Responsable de Formation role

-- CHEF EQUIPE (as specialization of PROFESSEUR) - Keep for backward compatibility during migration
INSERT INTO chef_equipe_roles (professeur_id) VALUES
(3);  -- Using separate ID for ChefEquipe role

-- RESPONSABLE DE FORMATION
INSERT INTO responsable_de_formation_roles (professeur_id) VALUES
(5);  -- Using separate ID for ResponsableDeFormation role

-- DIRECTEUR DE THESE - Keep for backward compatibility during migration
INSERT INTO directeur_de_these_roles (professeur_id) VALUES
(4);  -- Using separate ID for DirecteurDeThese role

-- DIRECTION CEDOC
INSERT INTO direction_cedoc (id, role_administrative) VALUES 
(6, 'DIRECTEUR');  -- Using separate ID for DirectionCedoc role

-- EQUIPE DE RECHERCHE
INSERT INTO equipes_de_recherches (id, nom_de_equipe, chef_equipe_role_id, created_at, updated_at) VALUES 
(1, 'Équipe Intelligence Artificielle', 3, NOW(), NOW());

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
('Analyse des données massives', 'Étude approfondie des techniques de traitement de Big Data.', true, true, NOW(), NOW(), 3, 4),
('Sécurité des systèmes embarqués', 'Recherche sur la cybersécurité dans les systèmes embarqués modernes.', false, true, NOW(), NOW(), 3, 4),
('Apprentissage automatique distribué', 'Optimisation des algorithmes de machine learning à grande échelle.', true, false, NOW(), NOW(), 3, 4),
('Systèmes autonomes intelligents', 'Conception de systèmes auto-adaptatifs pour la robotique.', false, false, NOW(), NOW(), 3, 4),
('Réseaux de neurones profonds', 'Amélioration de la performance des modèles de deep learning.', true, true, NOW(), NOW(), 3, 4),
('Vision par ordinateur avancée', 'Détection dobjets en temps réel dans les flux vidéo.', false, true, NOW(), NOW(), 3, 4),
('IoT et agriculture intelligente', 'Applications de linternet des objets dans lagriculture de précision.', true, true, NOW(), NOW(), 3, 4),
('Cloud Computing pour le calcul scientifique', 'Déploiement de modèles scientifiques sur le cloud.', false, false, NOW(), NOW(), 3, 4),
('Traitement du langage naturel en arabe', 'Développement de modèles NLP pour la langue arabe.', true, false, NOW(), NOW(), 3, 4),
('Blockchain et traçabilité alimentaire', 'Utilisation de la blockchain pour le suivi des produits agricoles.', false, true, NOW(), NOW(), 3, 4);
