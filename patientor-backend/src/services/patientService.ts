import { v1 as uuid } from 'uuid';
//import patientData from '../../data/patients';
import patientData from '../../data/patients-full';
import { Patient, NewPatient, NonSensitivePatient, Entry, EntryWithoutId} from '../types';


const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  //console.log(patients);
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



const findById = (id: string): Patient | undefined => {
  //console.log('findById id: ', id, 'typeof', typeof id);
  const patient = patients.find(p => p.id === id);
  return patient;
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

const addEntry = (entry: EntryWithoutId, patient_id: string): Entry => {
  console.log('addEntry called with parameters id: ', patient_id, 'entry: ', entry);
  const patient = findById(patient_id);
  if (patient) {
    const entry_id = uuid();
    const newEntry = { id: entry_id, ...entry };
    patient.entries.push(newEntry);
    return newEntry;
  }
  console.log('this should newer get executed');
  throw new Error('adding entry failed');
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry
};