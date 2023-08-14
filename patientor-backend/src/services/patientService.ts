import patientData from '../../data/patients.ts';
import { PatientEntry, Patient } from '../types.ts';

const getPatients = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitivePatients = (): Patient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};