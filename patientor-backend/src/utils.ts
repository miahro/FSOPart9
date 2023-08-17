import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText =  (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('incorrect or missing input');
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender ' + gender);
  }
  return gender;
};


const toNewPatientEntry = (object: unknown): NewPatient => {
  console.log(object);

  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatient = {
      name: parseText(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseText(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseText(object.occupation),
      entries: []
    };
    console.log(newEntry);
    return newEntry;
  }

  throw new Error('Incorrect data: field missing');
  
};

export default toNewPatientEntry;