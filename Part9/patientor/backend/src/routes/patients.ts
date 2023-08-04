import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  //const patients = patientsService.getEntries();
  res.send(patientsService.getNonSensitivePatientEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatients(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += "Error" + error.message;
    }
    res.status(400).send(errorMessage);
  }
  /*
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = patientsService.addPatients({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(addedEntry);
  //res.send("test");
  */
});

router.get("/:id", (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) res.send(patient);
  else res.sendStatus(404);
});

export default router;
