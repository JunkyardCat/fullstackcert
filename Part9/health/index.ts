import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).send({ error: "Not enough arguments" });
  }
  const heightNum: number = Number(height);
  const weightNum: number = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).send({ error: "malformed parameters" });
  }

  const bmi: { height: number; weight: number; bmi: string } = {
    height: heightNum,
    weight: weightNum,
    bmi: calculateBmi(heightNum, weightNum),
  };
  res.json(bmi);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
