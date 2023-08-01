import express from "express";
import patientsService from "../services/patientsService";
const router = express.Router();

router.get("/", (_req, res) => {
  //const patients = patientsService.getEntries();
  res.send(patientsService.getNonSensitivePatientEntries());
});

router.post("/", (_req, res) => {
  res.send("test");
});

export default router;
