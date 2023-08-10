import express from 'express';
import { calculateBmi } from './bmiCalculator'

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const params = req.query
  console.log(params, params.weight, params.height)
  const weight = Number(params.weight)
  const height = Number(params.height)
  if (!isNaN(weight) && !isNaN(height)){
    const result = calculateBmi(Number(params.weight), Number(params.height))
    res.json({
      "weight": weight,
      "height": height,
      "bmi": result
    })
    //res.send(result)
  } else {
    res.status(400).send({ error: "malformatted parameters" })
  }

})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});