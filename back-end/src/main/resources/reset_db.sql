-- ───────────────────────────────────────────────────────────────────
-- reset_db.sql
-- Truncate all tables in cedoc_db except “utilisateurs”
-- ───────────────────────────────────────────────────────────────────

-- 1) Disable foreign‐key checks (so we can truncate in any order)
SET FOREIGN_KEY_CHECKS = 0;

-- 2) Truncate each table (EXCEPT “utilisateurs”)

TRUNCATE TABLE attestations;
TRUNCATE TABLE avis_reinscriptions;
TRUNCATE TABLE candidats;
TRUNCATE TABLE candidature_sujets;
TRUNCATE TABLE candidatures;
TRUNCATE TABLE candidatures_accepter;
TRUNCATE TABLE candidatures_refuser;
TRUNCATE TABLE chef_equipe_roles;
TRUNCATE TABLE chefs_equipes;
TRUNCATE TABLE communications_conferences;
TRUNCATE TABLE demandes_attestions;         -- note: your actual table name is “demandes_attestions”
TRUNCATE TABLE demandes_attestions_seq;     -- note: your actual seq table name
TRUNCATE TABLE demandes_reinscriptions;
TRUNCATE TABLE demandes_soutenances;
TRUNCATE TABLE directeur_de_these_roles;
TRUNCATE TABLE directeurs_de_theses;
TRUNCATE TABLE direction_cedoc;
TRUNCATE TABLE doctorant_formation;
TRUNCATE TABLE doctorants;
TRUNCATE TABLE equipes_de_recherches;       -- note: plural “recherches”
TRUNCATE TABLE formations;
TRUNCATE TABLE jury;
TRUNCATE TABLE lieux_de_naissances;
TRUNCATE TABLE nationalites;
TRUNCATE TABLE professeurs;
TRUNCATE TABLE publications;
TRUNCATE TABLE responsable_de_formation_roles;
TRUNCATE TABLE responsables_de_formations;
TRUNCATE TABLE roles;
TRUNCATE TABLE roles_jury;
TRUNCATE TABLE seances_formations;
TRUNCATE TABLE soutenances;
TRUNCATE TABLE sujets;
TRUNCATE TABLE sujets_professeurs;
TRUNCATE TABLE tokens;
TRUNCATE TABLE utilisateur_roles;           -- join table for users↔roles
TRUNCATE TABLE vacations;

-- 3) Re‐enable foreign‐key checks
SET FOREIGN_KEY_CHECKS = 1;
