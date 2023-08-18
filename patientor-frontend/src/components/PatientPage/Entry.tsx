import { Diagnosis, Entry } from "../../types";
//import { DiagnoseListItem } from './DiagnoseList';
//import { Box } from '@mui/material';
import { HospitalEntryPage } from './HospitalEntryDetails';
import { HealthCheckEntryPage } from './HealthcheckEntryDetails';
import { OccupationalEntryPage } from './OccupationalHealthCareEntryDetails'
//import diagnoses from "../../services/diagnoses";

interface Props {
  entry : Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

//export const EntryPage = ({ entry, diagnoses }: Props) => {

export const EntryPage = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryPage entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryPage entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryPage entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
}

  // if (entry) {
  //   return (
  //     <Box
  //       sx={{
  //         border: 1
  //       }}>
  //           <p>{entry.description}</p>
  //           <ul>
  //             {entry.diagnosisCodes?.map(code => (
  //             <DiagnoseListItem code = {code} diagnoses={diagnoses} />
  //             ))}
  //           </ul>
  //     </Box>
  //   );
  //   } else {
  //     return null
  //   }
  

// }

export default EntryPage