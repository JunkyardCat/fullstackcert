import patientsData from "../data/patients";
import { PatientsEntry } from "../types";
import { NonSensitivePatientEntry } from "../types";

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

const addPatients = () => {
  return null;
};

export default {
  getEntries,
  addPatients,
  getNonSensitivePatientEntries,
};
