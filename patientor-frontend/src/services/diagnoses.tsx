import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  //console.log(data)
  return data;
};

// const create = async (object: PatientFormValues) => {
//   const { data } = await axios.post<Patient>(
//     `${apiBaseUrl}/patients`,
//     object
//   );

//   return data;
// };

// const getId = async (id: string) => {
//   const { data } = await axios.get<Patient>(
//     `${apiBaseUrl}/patients/${id}`
//   );
//   console.log(data);
//   return data;
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll
};

