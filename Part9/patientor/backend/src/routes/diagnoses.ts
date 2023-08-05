import express from "express";
import diagnosesService from "../services/diagnosesService";
const router = express.Router();

router.get("/", (_req, res) => {
  console.log("get all diagnoses");
  const diagnose = diagnosesService.getEntries();
  res.send(diagnose);
});

router.post("/", (_req, res) => {
  res.send("saving a diagnoses");
});

router.get('/:codes',(req, res) => {
  const codes = req.params.codes.split(',')
  res.send(diagnosesService.getDiagCode(codes))
})

export default router;
