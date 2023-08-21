import { NewPatient, Gender, EntryWithoutId, NewBaseEntry, Diagnosis } from './types';

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


const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


const parseDischarge = (object: unknown) => {
  if( !object || typeof object !== 'object' ){
      throw new Error('Incorrect or missing data');
  }

  if( 'date' in object
     && 'criteria' in object){
      const discharge = {
          date: parseDate(object.date),
          criteria: parseText(object.criteria)
      };
      return discharge;
  }
  throw new Error('Incorrect of missing data');
};

const parseSickLeave = (object: unknown) => {
  if( !object || typeof object !== 'object' ){
      throw new Error('Incorrect or missing data');
  }

  if( 'startDate' in object
     && 'endDate' in object){
      const sickLeave = {
          startDate: parseDate(object.startDate),
          endDate: parseText(object.endDate)
      };
      return sickLeave;
  }
  throw new Error('Incorrect of missing data');
};

const parseHealthCheckRating = (object: unknown) => {
 //console.log('parseHealthCheckRating gets called');
  if( !object || typeof object !== 'object' ){
      throw new Error('Incorrect or missing data');
  }

  if( 'healthCheckRating' in object){
      const healthCheckRating = Number(object.healthCheckRating);
      //console.log('in parseHealthCheckRating, healtcheckrating: ', healthCheckRating);
      return healthCheckRating;
  }
  throw new Error('Incorrect of missing data');
};


export const toNewPatientEntry = (object: unknown): NewPatient => {
  //console.log(object);

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
    //console.log(newEntry);
    return newEntry;
  }

  throw new Error('Incorrect data: field missing');
  
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  //console.log('utilts / toNewEntry: ', object);

  if (!object || typeof object !== 'object') {
    throw new Error('incorrect or missing data');
  }
  if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
    
    const newBaseEntry: NewBaseEntry = 'diagnosisCodes' in object ?
    {
        description: parseText(object.description),
        date: parseDate(object.date),
        specialist: parseText(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object)
    }
    : 
    {
        description: parseText(object.description),
        date: parseDate(object.date),
        specialist: parseText(object.specialist)
    };
    //console.log('newBaseEntry:', newBaseEntry);

    switch (object.type) {
      case "Hospital":
        if ('discharge' in object ) {
          const newHospitalEntry: EntryWithoutId = {
            ...newBaseEntry,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge)  
          };
          return newHospitalEntry;
          }
          throw new Error('missing or incomplete data');
      case "OccupationalHealthcare":
      //  console.log("occupationalHealthCare");
          if ('sickLeave' in object && 'employerName' in object) {
            const newOccupationalEntry: EntryWithoutId = {
              ...newBaseEntry,
              type: 'OccupationalHealthcare',
              employerName: parseText(object.employerName),
              sickLeave: parseSickLeave(object.sickLeave)
            };
            return newOccupationalEntry;
          } else if ('employerName' in object) {
            const newOccupationalEntry: EntryWithoutId = {
              ...newBaseEntry,
              type: 'OccupationalHealthcare',
              employerName: parseText(object.employerName)
            };
            return newOccupationalEntry;  
          }
          throw new Error('missing or incomplete data');
      case 'HealthCheck':
        //console.log("HealthCheckRating case");
        if ("healthCheckRating" in object) {
        //  console.log("healthCheckRating parameter found from object");
          const newHealthCheckEntry: EntryWithoutId = {
            ...newBaseEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object)
          };
        //  console.log('newHealthCheckEntry: ', newHealthCheckEntry);
          return newHealthCheckEntry;
        } 
        throw new Error('missing or incomplete data');
    }
  } 
  throw new Error('incorrect or missing data');


};

export default {toNewPatientEntry, toNewEntry};