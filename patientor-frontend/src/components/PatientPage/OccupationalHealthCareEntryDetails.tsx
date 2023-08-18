import { Diagnosis, Entry } from "../../types";
import { DiagnoseListItem } from './DiagnoseList'
import { Box } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry : Entry;
  diagnoses: Diagnosis[];
}

export const OccupationalEntryPage = ({ entry, diagnoses }: Props) => {


  if (entry.type==='OccupationalHealthcare') {
    return (
      <Box
        sx={{
          border: 1
        }}>
            <div>
              {entry.date}
              <WorkIcon></WorkIcon>
              {entry.employerName}
            </div>
            <i>{entry.description}</i>
            <ul>
              {entry.diagnosisCodes?.map(code => (
              <DiagnoseListItem key = {code} code = {code} diagnoses={diagnoses} />
              ))}
            </ul>

            <div>
              {entry.sickLeave?.startDate? (
                <p>sick leave start: {entry.sickLeave.startDate}</p>
              ): null}
            </div>
            <div>
              {entry.sickLeave?.endDate? (
                <p>sick leave end: {entry.sickLeave.endDate}</p>
              ): null}
            </div>
            diagnose by {entry.specialist}
      </Box>
    );
    } else {
      return null
    }
  

}

export default OccupationalEntryPage