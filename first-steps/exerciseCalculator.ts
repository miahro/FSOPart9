interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
}

const parseArgs = (args: string[]): number[] => {
  if (args.length < 3) throw new Error('not enough arguments');

  if (args.slice(2).every(item => !isNaN(Number(item)))) {
    return args.slice(2).map(item => Number(item));
  } else {
    throw new Error('some training hour values were not numbers.');
  }
};

export const calculateExercises = (dailyHours: number[], trainingTarget?: number) : ExerciseResult => {
  //const trainingTarget: number = 2;
  if (!trainingTarget) {
    trainingTarget=2;
  }
  const periodLength: number = dailyHours.length;
  const trainingDays: number = dailyHours.filter(Number).length;
  const sum: number = dailyHours.reduce((a,b) => a+b, 0);
  const average: number = periodLength > 0 ? sum/periodLength : 0;
  const success: boolean = average >= trainingTarget;
  const achieved: number = average / trainingTarget;
  const rating: number = achieved >= 1 && 3 || achieved >= 0.5 && 2 || 3;
  const ratingDescription: string = achieved >= 1 && "Excellent, target achieved" || achieved >= 0.5 && "Not too bad but could be better" || "Quite lazy, man up";
  
  const result: ExerciseResult = { 
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: trainingTarget,
    average: average
  };
    return result;
};

try {
  const exercises = parseArgs(process.argv);
  console.log(exercises);
  console.log(calculateExercises(exercises));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}