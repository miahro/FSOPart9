import { Diagnosis, Entry } from "../../types";
import { HospitalEntryPage } from './HospitalEntryDetails';
import { HealthCheckEntryPage } from './HealthcheckEntryDetails';
import { OccupationalEntryPage } from './OccupationalHealthCareEntryDetails'


interface Props {
  entry : Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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



export default EntryPage