interface Values {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): Values => {
  console.log("", args.length);
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (Number(args[2]) <= 0 || Number(args[3]) <= 0) {
    throw new Error("height and weight must be greater than zero");
  }
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("height and mass isnt a number");
  }
};

export const calculateBmi = (height: number, mass: number): string => {
  //mass divide height
  const bmi = mass / (height / 100) ** 2;
  console.log(bmi);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 18.4 && bmi <= 24.9) {
    return "Normal";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else if (bmi >= 30.0) {
    return "Obese";
  }
  return "";
};

try {
  console.log(process.argv);
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "something bad happened";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
