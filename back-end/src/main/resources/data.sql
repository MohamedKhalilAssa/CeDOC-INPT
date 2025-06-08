-- data.sql for cedoc_db
-- --------------------------------------------------
-- 1) ROLES
-- --------------------------------------------------
INSERT IGNORE INTO roles (intitule) VALUES 
  ('CANDIDAT'),
  ('PROFESSEUR'),
  ('DOCTORANT'),
  ('CHEF_EQUIPE'),
  ('RESPONSABLE_FORMATION'),
  ('DIRECTEUR_DE_THESE'),
  ('DIRECTION_CEDOC')
;

-- --------------------------------------------------
-- 2) LIEUX DE NAISSANCE
-- --------------------------------------------------
INSERT IGNORE INTO lieux_de_naissances (ville, pays) VALUES 
  ('Rabat', 'Maroc'),
  ('Tunis', 'Tunisie'),
  ('Paris', 'France')
;

-- --------------------------------------------------
-- 3) NATIONALITÉS
-- --------------------------------------------------
INSERT IGNORE INTO nationalites (intitule) VALUES 
  ('Marocaine'),
  ('Tunisienne'),
  ('Française')
;

-- --------------------------------------------------
-- 4) UTILISATEURS
-- --------------------------------------------------
INSERT IGNORE INTO utilisateurs (
    created_at,
    date_naissance,
    email,
    email_valider,
    etat_civil,
    genre,
    nom,
    password,
    prenom,
    telephone,
    updated_at,
    lieu_naissance_id,
    nationalite_id
) VALUES 
  (
    NOW(),
    '1998-04-15',
    'ali.bensalah@example.com',
    1,                -- BIT(1)
    'CELIBATAIRE',
    'HOMME',
    'Ben Salah',
    '$2a$…',           -- your bcrypt
    'Ali',
    '+212612345678',
    NOW(),
    1,
    1
  ),
  (
    NOW(),
    '1992-11-03',
    'fatima.ouahbi@example.com',
    0,
    'MARIER',
    'FEMME',
    'Ouahbi',
    '$2a$…',
    'Fatima',
    '+212698745632',
    NOW(),
    2,
    2
  ),
  (
    NOW(),
    '1985-06-27',
    'yacine.elhassani@example.com',
    1,
    'CELIBATAIRE',
    'HOMME',
    'El Hassani',
    '$2a$…',
    'Yacine',
    '+212677889900',
    NOW(),
    3,
    3
  )
;

-- --------------------------------------------------
-- 5) CANDIDATS / PROFESSEURS / DOCTORANTS / ROLES
-- --------------------------------------------------
INSERT IGNORE INTO candidats   (utilisateur_id, archiver) VALUES (1, FALSE);
INSERT IGNORE INTO professeurs (utilisateur_id, grade)     VALUES (2, 'PES');
INSERT IGNORE INTO doctorants  (utilisateur_id, date_inscription, statut_doctorant, nombre_heures_labo, draft_diplome_url, archiver)
                                 VALUES (3, '2023-09-01', 'EN_COURS', 100, 'http://example.com/draft.pdf', FALSE);

INSERT IGNORE INTO utilisateur_roles (utilisateur_id, role_id) VALUES
  (1,1), (2,2), (2,4), (2,6), (2,5), (2,7), (3,3)
;

-- --------------------------------------------------
-- 6) SPÉCIFIQUE “COMPOSITION” DES RÔLES PROFESSEUR
-- --------------------------------------------------
INSERT IGNORE INTO chef_equipe_roles                 (professeur_id) VALUES (2);
INSERT IGNORE INTO directeur_de_these_roles          (professeur_id) VALUES (2);
INSERT IGNORE INTO responsable_de_formation_roles    (professeur_id) VALUES (2);
INSERT IGNORE INTO direction_cedoc                   (utilisateur_id, role_administrative) VALUES (2, 'DIRECTEUR');

-- --------------------------------------------------
-- 7) ÉQUIPES DE RECHERCHE
-- --------------------------------------------------
INSERT IGNORE INTO equipes_de_recherches (
  nom_de_equipe,
  created_at,
  updated_at,
  chef_equipe_id,
  chef_equipe_role_id
) VALUES (
  'Intelligence Artificielle et Data Science',
  NOW(),
  NOW(),
  1,  -- chef_equipe_roles.id
  1   -- chef_equipe_roles.id
);

-- --------------------------------------------------
-- 8) SUJETS
-- --------------------------------------------------
INSERT IGNORE INTO sujets (
    intitule,
    description,
    est_valide,
    est_public,
    created_at,
    updated_at,
    chef_equipe_role_id,
    directeur_these_role_id
) VALUES
  ('Analyse des données massives', 'Étude approfondie des techniques de traitement de Big Data.', true, true, NOW(), NOW(), 1, 1),
    ('Sécurité des systèmes embarqués', 'Recherche sur la cybersécurité dans les systèmes embarqués modernes.', false, true, NOW(), NOW(), 1, 1),
    ('Apprentissage automatique distribué', 'Optimisation des algorithmes de machine learning à grande échelle.', true, false, NOW(), NOW(), 1, 1),
    ('Systèmes autonomes intelligents', 'Conception de systèmes auto-adaptatifs pour la robotique.', false, false, NOW(), NOW(), 1, 1),
    ('Réseaux de neurones profonds', 'Amélioration de la performance des modèles de deep learning.', true, true, NOW(), NOW(), 1, 1),
    ('Vision par ordinateur avancée', 'Détection d’objets en temps réel dans les flux vidéo.', false, true, NOW(), NOW(), 1, 1),
    ('IoT et agriculture intelligente', 'Applications de l’internet des objets dans l’agriculture de précision.', true, true, NOW(), NOW(), 1, 1),
    ('Cloud Computing pour le calcul scientifique', 'Déploiement de modèles scientifiques sur le cloud.', false, false, NOW(), NOW(), 1, 1),
    ('Traitement du langage naturel en arabe', 'Développement de modèles NLP pour la langue arabe.', true, false, NOW(), NOW(), 1, 1),
    ('Blockchain et traçabilité alimentaire', 'Utilisation de la blockchain pour le suivi des produits agricoles.', false, true, NOW(), NOW(), 1, 1);
