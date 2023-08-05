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

const getDiagCode = (codes: string[]): DiagnosesEntry[] => {
  return diagnosesData.filter(x=>codes.includes(x.code))
}

export default {
  getEntries,
  addDiagnoses,
  getDiagCode
};
