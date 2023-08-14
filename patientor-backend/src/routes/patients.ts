import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res)=> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.send(patientService.addPatient(name, dateOfBirth, ssn, gender, occupation));  
  //res.send('saving patient');
});

export default router;