import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, NewPatient, NonSensitivePatient } from '../types';


const patients: Patient[] = patientData as Array<Patient>;

const getPatients = (): Patient[] => {
  console.log(patients);
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(( p ) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
    entries: p.entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  //console.log('patienServices addPatient gets as prop patient:', patient);
  const id = uuid();
  const newPatient = { id, ...patient };
  //console.log('patientService addPatien patient after adding id');
  //patientData.push(newPatient);
  patients.push(newPatient);
  //console.log(newPatient);
  
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};