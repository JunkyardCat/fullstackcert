import patientsData from "../data/patients";
import { PatientsEntry, NewPatientEntry } from "../types";
import { NonSensitivePatientEntry } from "../types";
import { v4 as uuidv4 } from "uuid";

const getEntries = (): PatientsEntry[] => {
  return patientsData;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  //return patientsData;
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = (entry: NewPatientEntry): PatientsEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): PatientsEntry | undefined => {
  return patientsData.find((patient) => patient.id === id);
};

export default {
  getEntries,
  addPatients,
  getNonSensitivePatientEntries,
  getPatient,
};
