// src/Types/DoctorantTypes.ts

export enum DoctorantStatus {
  CANDIDAT = 'candidat',
  CANDIDAT_ACCEPTE = 'candidat_accepte',
  DOCTORANT = 'doctorant',
  DOCTORANT_PREINSCRIT = 'doctorant_preinscrit'
}

export enum ValidationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface Publication {
  id: string;
  journal: string;
  publicationDate: string;
  authors: string[];
  title: string;
  justificatif: string; // URL or PDF path
  validationStatus: ValidationStatus;
  validatedBy?: string;
  validatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Communication {
  id: string;
  conference: string;
  date: string;
  location: string;
  authors: string[];
  title: string;
  type: 'national' | 'international';
  justificatif: string;
  validationStatus: ValidationStatus;
  validatedBy?: string;
  validatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vacation {
  id: string;
  courseTitle: string;
  date: string;
  establishment: string;
  duration: number; // in hours
  level: string;
  justificatif: string;
  validationStatus: ValidationStatus;
  validatedBy?: string;
  validatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Award {
  id: string;
  title: string;
  date: string;
  description?: string;
  justificatif: string;
  validationStatus: ValidationStatus;
  validatedBy?: string;
  validatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctorant {
  id: string;
  userId: string;
  status: DoctorantStatus;
  equipeId?: string;
  directeurTheseId?: string;
  codirecteurTheseId?: string;
  sujetTheseId?: string;
  dateInscription?: string;
  anneeInscription?: number;
  hasEquivalence: boolean;
  equivalenceDeadline?: string;
  publications: Publication[];
  communications: Communication[];
  vacations: Vacation[];
  awards: Award[];
  formations: string[]; // Formation IDs
  canDefend: boolean;
  notifiedForDefense: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewResult {
  id: string;
  candidatId: string;
  equipeId: string;
  status: 'accepted' | 'rejected';
  pvDocument?: string;
  interviewDate: string;
  interviewers: string[]; // Professor IDs
  comments?: string;
  createdBy: string;
  createdAt: string;
}

export interface DefenseEligibility {
  isEligible: boolean;
  articlesCount: number;
  internationalCommunicationsCount: number;
  meetsMinimumRequirement: boolean;
  requirementDetails: string;
}

// Form interfaces
export interface PublicationFormData {
  journal: string;
  publicationDate: string;
  authors: string[];
  title: string;
  justificatif: File | string;
}

export interface CommunicationFormData {
  conference: string;
  date: string;
  location: string;
  authors: string[];
  title: string;
  type: 'national' | 'international';
  justificatif: File | string;
}

export interface VacationFormData {
  courseTitle: string;
  date: string;
  establishment: string;
  duration: number;
  level: string;
  justificatif: File | string;
}

export interface AwardFormData {
  title: string;
  date: string;
  description?: string;
  justificatif: File | string;
}