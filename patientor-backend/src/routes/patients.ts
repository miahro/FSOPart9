import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res)=> {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    res.status(400).send(errorMessage);
  }


  // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  // // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  // res.send(patientService.addPatient(name, dateOfBirth, ssn, gender, occupation));  
  //res.send('saving patient');
});

export default router;