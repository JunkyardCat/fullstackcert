import diagnosesData from "../data/diagnoses";
import { DiagnosesEntry } from "../types";

//const diagnoses: DiagnosesEntry[] = diagnosesData as DiagnosesEntry[];

const getEntries = (): DiagnosesEntry[] => {
  //return diagnoses;
  return diagnosesData;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses,
};
