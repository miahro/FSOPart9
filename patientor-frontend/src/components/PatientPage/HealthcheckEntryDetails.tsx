import { Diagnosis, Entry, HealthCheckRating } from "../../types";
import { DiagnoseListItem } from './DiagnoseList'
import { Box } from '@mui/material'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Favorite } from "@mui/icons-material";

interface Props {
  entry : Entry;
  diagnoses: Diagnosis[];
}

export const HealthCheckEntryPage = ({ entry, diagnoses }: Props) => {

  const HealthRatingIcon = (rating: HealthCheckRating) => {
    let color = 'green'
    if (rating===1){
      color = 'yellow'
    } else if (rating===2){
      color = 'orange'
    } else if (rating===3){
      color = 'red'
    }
  
    return <Favorite style={{ color }}></Favorite>
  }

  if (entry.type === 'HealthCheck') {
    return (
      <Box
        sx={{
          border: 1
        }}>
            <div>
              {entry.date}
              <MedicalServicesIcon></MedicalServicesIcon>
            </div>
            <i>{entry.description}</i>
            <ul>
              {entry.diagnosisCodes?.map(code => (
              <DiagnoseListItem code = {code} diagnoses={diagnoses} />
              ))}
            </ul>
            {HealthRatingIcon(entry.healthCheckRating)}
            <p>diagnose by {entry.specialist}</p>
      </Box>
    );
    } else {
      return null
    }
  

}

export default HealthCheckEntryPage