const calculateBmi = (height: number, mass: number): string => {
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
};

console.log(calculateBmi(180, 74));
