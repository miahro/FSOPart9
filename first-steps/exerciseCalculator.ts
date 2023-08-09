interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
}

const calculateExercises = (dailyHours: number[]) : ExerciseResult => {
  const trainingTarget: number = 2;
  const periodLength: number = dailyHours.length;
  const trainingDays: number = dailyHours.filter(Number).length;
  const sum: number = dailyHours.reduce((a,b) => a+b, 0)
  const average: number = periodLength > 0 ? sum/periodLength : 0;
  const success: boolean = average >= trainingTarget
  const achieved: number = average / trainingTarget
  const rating: number = achieved >= 1 && 3 || achieved >= 0.5 && 2 || 3
  const ratingDescription: string = achieved >= 1 && "Excellent, target achieved" || achieved >= 0.5 && "Not too bad but could be better" || "Quite lazy, man up"
  
  let result: ExerciseResult = { 
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: trainingTarget,
    average: average
  }
    return result
}

try {
  console.log(calculateExercises([0,1,2,3,4,5,6,7,8,9]));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}