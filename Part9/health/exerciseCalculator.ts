interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (timeDaily: number[], target: number): Result => {
  const periodLength = timeDaily.length;
  const trainingDays = timeDaily.filter((hour) => hour > 0).length;
  const average = timeDaily.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  const getRating = (average: number, target: number): number => {
    if (average < target * 0.9) return 1;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
