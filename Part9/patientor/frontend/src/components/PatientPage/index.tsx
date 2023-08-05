import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DiagnosesEntry, Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from '../../services/diagnoses'
import TransgenderIcon from "@mui/icons-material/Transgender";
import {isString} from '../../utils'

const HandleGender = ({patient}: {patient: Patient}) => {
  //console.log(patient.gender, typeof patient.gender)
  if(patient.gender === 'male'){
    return <MaleIcon fontSize="large" />
  }else if (patient.gender === "female") {
    return <FemaleIcon fontSize="large" />;
  } else {

    return <TransgenderIcon fontSize="large" />;
  }
  /*
  if (patient.gender === "Male") {
    return <MaleIcon fontSize="large" />;
  } else if (patient.gender === "female") {
    return <FemaleIcon fontSize="large" />;
  } else {

    return <Transgender fontSize="large" />;
  }
  */
  //return null
};

const PatientPage = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<DiagnosesEntry[]>([])

  
  const fetchPatient = async () => {
    if (!id) return;
    const patient = await patientService.get(id);
    setPatient(patient);
  };

  useEffect(() => {
    void fetchPatient();
    //console.log(typeof patient.gender)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const fetchDiagnoses = async (entries: Entry[])=> {
    const diagCodes = entries.map(x=>x.diagnosisCodes).flat().filter(isString)
    console.log('inside fetch before get',diagCodes)
    const diagnoses = await diagnosisService.getCode(diagCodes)
    console.log('inside fetch',diagnoses)
    setDiagnoses(diagnoses)
  }

  useEffect(()=> {
    if(patient)
    void fetchDiagnoses(patient.entries)
  },[patient])

  if (!patient) return null;

  return (
    <div style={{ marginTop: 25 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">{patient.name}</Typography>
        <HandleGender patient={patient}/>
      </div>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <div>
        <Typography variant='h5'>entries</Typography>
        {
          patient.entries && patient.entries.map((x,y)=>(
            <div key={y}>
              <Typography variant='body1'>{x.date} {x.description}</Typography>
              {diagnoses && (
                <ul>
                  {diagnoses.map((a,b)=>(<li key={b}>{a.code} {a.name}</li>))}
                </ul>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PatientPage;
