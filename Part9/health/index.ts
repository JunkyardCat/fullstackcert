import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  console.log("exercises", req.body);
  const { daily_exercises, target } = req.body as {
    daily_exercises: number[];
    target: number;
  };
  console.log("exercises 02", daily_exercises, typeof daily_exercises, target);

  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  }
  if (isNaN(Number(target))) {
    res.status(400).send({ error: "malformed parameters" });
  }

  daily_exercises.forEach((hour) => {
    if (isNaN(Number(hour))) {
      res.status(400).send({ error: "malformed parameters" });
    }
  });

  const dailyHours: number[] = [];
  /*
  try {
    //console.log("dailyExercises 01", JSON.parse(daily_exercises));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dailyExercises: number[] = JSON.parse(daily_exercises);
    console.log("dailyExercises 02", dailyExercises);

    dailyExercises.forEach((hour) => {
      if (isNaN(Number(hour))) {
        throw new Error();
      }
      dailyHours.push(Number(hour));
    });
  } catch (error) {
    res.status(400).send({ error: "should be an array" });
  }
  */
  console.log("finally here", dailyHours);
  const result: {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  } = calculateExercises(target, daily_exercises);
  console.log("result", result);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
