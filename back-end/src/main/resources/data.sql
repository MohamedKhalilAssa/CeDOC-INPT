-- Insert roles
INSERT INTO roles (intitule) VALUES 
('CANDIDAT'),
('PROFESSEUR'),
('DOCTORANT'),
('CHEF_EQUIPE'),
('RESPONSABLE_FORMATION'),
('DIRECTEUR_DE_THESE'),
('DIRECTION_CEDOC');

-- Insert birthplaces
INSERT INTO lieux_de_naissances (ville, pays) VALUES 
('Rabat', 'Maroc'),
('Tunis', 'Tunisie'),
('Paris', 'France');

-- Insert nationalities
INSERT INTO nationalites (intitule) VALUES 
('Marocaine'),
('Tunisienne'),
('Française');

-- Insert users
INSERT INTO utilisateurs (
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
    NOW(), '1998-04-15', 'ali.bensalah@example.com', 1, 'CELIBATAIRE', 'HOMME',
    'Ben Salah', '$2a$04$5y7HHz04OMpFAukUrfRWl.pXzj4GmaOJ9PqLkktT3TgjSR9Py/VCK',
    'Ali', '+212612345678', NOW(), 1, 1
),
(
    NOW(), '1992-11-03', 'fatima.ouahbi@example.com', 1, 'MARIER', 'FEMME',
    'Ouahbi', '$2a$04$5y7HHz04OMpFAukUrfRWl.pXzj4GmaOJ9PqLkktT3TgjSR9Py/VCK',
    'Fatima', '+212698745632', NOW(), 2, 2
),
(
    NOW(), '1985-06-27', 'yacine.elhassani@example.com', 1, 'CELIBATAIRE', 'HOMME',
    'El Hassani', '$2a$04$5y7HHz04OMpFAukUrfRWl.pXzj4GmaOJ9PqLkktT3TgjSR9Py/VCK',
    'Yacine', '+212677889900', NOW(), 3, 3
);

-- Insert professors
INSERT INTO professeurs (utilisateur_id, grade) VALUES
(2, 'PES'),
(1, 'PES');

-- Assign roles
INSERT INTO chef_equipe_roles (professeur_id) VALUES (2);
INSERT INTO directeur_de_these_roles (professeur_id) VALUES (2);
INSERT INTO utilisateur_roles (role_id, utilisateur_id) VALUES
(4, 2), -- CHEF_EQUIPE
(6, 2); -- DIRECTEUR_DE_THESE

-- Insert subjects
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
('Analyse des données massives', 'Étude approfondie des techniques de traitement de Big Data.', true, true, NOW(), NOW(), 2,2),
('Sécurité des systèmes embarqués', 'Recherche sur la cybersécurité dans les systèmes embarqués modernes.', true, true, NOW(), NOW(),  2,2),
('Apprentissage automatique distribué', 'Optimisation des algorithmes de machine learning à grande échelle.', true, true, NOW(), NOW(),  2,2),
('Systèmes autonomes intelligents', 'Conception de systèmes auto-adaptatifs pour la robotique.', true, true, NOW(), NOW(),  2,2),
('Réseaux de neurones profonds', 'Amélioration de la performance des modèles de deep learning.', true, true, NOW(), NOW(),  2,2),
('Vision par ordinateur avancée', 'Détection d’objets en temps réel dans les flux vidéo.', false, true, NOW(), NOW(),  2,2),
('IoT et agriculture intelligente', 'Applications de l’internet des objets dans l’agriculture de précision.', true, true, NOW(), NOW(),  2,2),
('Cloud Computing pour le calcul scientifique', 'Déploiement de modèles scientifiques sur le cloud.', true, true, NOW(), NOW(),  2,2),
('Traitement du langage naturel en arabe', 'Développement de modèles NLP pour la langue arabe.', true, false, NOW(), NOW(),  2,2),
('Blockchain et traçabilité alimentaire', 'Utilisation de la blockchain pour le suivi des produits agricoles.', true, true, NOW(), NOW(),  2,2);

-- Insert research teams
INSERT INTO equipes_de_recherches (
  nom_de_equipe,
  created_at,
  updated_at,
  chef_equipe_id
) VALUES
('Cybersécurité et Réseaux', NOW(), NOW(), 2);

-- Update professor's team
UPDATE professeurs p SET equipe_de_recherche_id = 1 WHERE p.utilisateur_id = 2;
