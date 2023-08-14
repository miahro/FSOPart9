import { v1 as uuid } from 'uuid';
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

const addPatient = (name: "string", dateOfBirth: "string", ssn: "string", 
  gender: "string", occupation: "string"): PatientEntry => {

  const id = uuid();
  const newPatientEntry = {
    id, name, dateOfBirth, ssn, gender, occupation
  };
  patientData.push(newPatientEntry);
  console.log(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};