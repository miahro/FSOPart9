import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { PatientEntry, NewPatientEntry, NonSensitivePatientEntry } from '../types';


const patients: PatientEntry[] = patientData as Array<PatientEntry>; 

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(( p ) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation
  }));
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {

  const id = uuid();
  const newPatient = { id, ...patient };
  patientData.push(newPatient);
  console.log(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};