interface Values {
  targetDailyHour: number;
  dailyHours: number[];
}

const parseArguments = (args: Array<string>): Values => {
  console.log("", args.length);
  if (args.length < 4) throw new Error("Not enough arguments");
  //if (args.length > 4) throw new Error("Too many arguments");
  if (isNaN(Number(args[2]))) {
    console.log("inside error", args[2]);
    throw new Error("First Argument cannot be other value other than number");
  }

  const dailyHoursArgs: string[] = args.slice(3);
  const dailyHours: number[] = [];

  dailyHoursArgs.forEach((hour) => {
    if (isNaN(Number(hour))) {
      throw new Error("Provided values were not numbers");
    }
    dailyHours.push(Number(hour));
  });
  console.log("end of parse", Number(args[2]), dailyHours);
  return {
    targetDailyHour: Number(args[2]),
    dailyHours,
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export const calculateExercises = (
  target: number,
  timeDaily: number[]
): Result => {
  const periodLength = timeDaily.length;
  const trainingDays = timeDaily.filter((hour) => hour > 0).length;
  const average = timeDaily.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  const getRating = (average: number, target: number): number => {
    if (average < target * 0.5) return 1;
    if (average < target) return 2;
    if (average >= target) return 3;
  };

  const getRatingDescription = (rating: number): string => {
    if (rating === 1) {
      return "try again next time";
    }
    if (rating === 2) {
      return "not too bad but could be better";
    }
    if (rating === 3) {
      return "super congratulations";
    }
  };

  const rating = getRating(average, target);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  console.log(process.argv);
  const { targetDailyHour, dailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(targetDailyHour, dailyHours));
} catch (error: unknown) {
  let errorMessage = "something bad happened";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
