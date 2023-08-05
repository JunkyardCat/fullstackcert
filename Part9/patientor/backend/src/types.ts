export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<DiagnosesEntry['code']>
}

export enum healthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: number
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<PatientsEntry, "ssn" | "entries">;
export type NewPatientEntry = Omit<PatientsEntry, "id">;
