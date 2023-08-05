import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import TransgenderIcon from "@mui/icons-material/Transgender";

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

  if (!patient) return null;

  return (
    <div style={{ marginTop: 25 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">{patient.name}</Typography>
        <HandleGender patient={patient}/>
      </div>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
    </div>
  );
};

export default PatientPage;
