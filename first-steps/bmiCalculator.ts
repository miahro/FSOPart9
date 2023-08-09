interface BmiValues {
  weight: number;
  height: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Weight and height were not numbers.')
  }
}

const calculateBmi = (weight: number, height: number) : string => {
  const bmi: number = weight / ( height*height);
  switch(true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi <= 16.9:
      return "Underweight (Moderate thinness)";
    case bmi <= 18.4:
      return "Underweight (Mild thinness)";
    case bmi <= 24.9:
      return "Normal (healthy weight)";
    case bmi <= 29.9:
      return "Overweight (Pre-obese)";
    case bmi <= 34.9:
      return "Obese (Class I)";
    case bmi < 40:
      return "Obese (Class II)"
    case bmi >= 40:
      return "Obese (Class III)"
    default:
      throw new Error('impossible BMI')
  }
}


try {
  const { weight, height } = parseArguments(process.argv)
  console.log(calculateBmi(weight, height));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}