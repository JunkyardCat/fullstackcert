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

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatientsEntry, "ssn">;
export type NewPatientEntry = Omit<PatientsEntry, "id">;