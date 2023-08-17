import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  //res.send(patientService.getNonSensitivePatients());
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const pat = patientService.findById(id);
  console.log(pat);
  res.send(patientService.findById(id));
});

router.post('/', (req, res)=> {
  try {
    
    const newPatient = toNewPatientEntry(req.body);
    console.log('toNewPatientEnry returns: ', newPatient);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

export default router;