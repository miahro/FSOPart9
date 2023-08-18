import { Diagnosis, Entry } from "../../types";
import { DiagnoseListItem } from './DiagnoseList'
import { Box } from '@mui/material'
import { LocalHospital } from "@mui/icons-material";

interface Props {
  entry : Entry;
  diagnoses: Diagnosis[];
}

export const HospitalEntryPage = ({ entry, diagnoses }: Props) => {
  if (entry.type==='Hospital') {
    return (
      <Box
        sx={{
          border: 1
        }}>
            <div>
              {entry.date}
              <LocalHospital></LocalHospital>
            </div>
            <i>{entry.description}</i>
            <ul>
              {entry.diagnosisCodes?.map(code => (
              <DiagnoseListItem key={code} code = {code} diagnoses={diagnoses} />
              ))}
            </ul>
            <div>
              {entry.discharge?.date? (
                <p>discharge date: {entry.discharge.date}</p>
              ): null}
            </div>
            <div>
              {entry.discharge?.criteria? (
                <p>discharge criteria: {entry.discharge.criteria}</p>
              ): null}
            </div>
            diagnose by {entry.specialist}
      </Box>
    );
    } else {
      return null
    }
  

}

export default HospitalEntryPage