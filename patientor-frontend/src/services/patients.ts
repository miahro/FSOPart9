import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getId = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  console.log(data);
  return data;
}

const createEntry = async (patient_id: string, object: EntryWithoutId) => {
  console.log('patientService createEntry with object: ', object, 'and id: ', patient_id)
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${patient_id}`,
    object
  )
  if (!data) {
    console.log('no return data')
  }
  console.log('createEntry return data:', data)
  return data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getId, createEntry
};

