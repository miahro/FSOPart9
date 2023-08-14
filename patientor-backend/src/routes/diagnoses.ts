import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  console.log(diagnoseService.getDiagnoses());
  res.send(diagnoseService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;