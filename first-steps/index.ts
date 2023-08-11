import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const params = req.query;
  console.log(params, params.weight, params.height);
  const weight = Number(params.weight);
  const height = Number(params.height);
  if (!isNaN(weight) && !isNaN(height)){
    const result = calculateBmi(Number(params.weight), Number(params.height));
    res.json({
      "weight": weight,
      "height": height,
      "bmi": result
    });
  } else {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
   if (!target || !daily_exercises){
    res.status(400).send({ error: "parameters missing"});
  }
  if (isNaN(Number(target))) {
    res.status(400).send({ error: "target is not number"});    
  }
  if (!Array.isArray(daily_exercises)){
    res.status(400).send({ error: "daily exercises is not array"});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i: number = 0; i < daily_exercises.length; i++){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (typeof daily_exercises[i] !== 'number') {
      res.status(400).send({ error: "daily exerceses are not numbers"});
      break;
    }
  }
   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.status(200).send(calculateExercises(daily_exercises, target));
}
);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});