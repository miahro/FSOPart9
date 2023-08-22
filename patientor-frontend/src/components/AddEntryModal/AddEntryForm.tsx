import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, MenuItem, InputLabel, Select } from '@mui/material';

import { EntryWithoutId, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  
}



const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState(['']);
  const [rating, setRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [entryType, setEntryType] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');
  const [employer, setEmployer] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(entryType)
    switch(entryType){
      case 'healthcheck':
        onSubmit({
          description,
          date,
          specialist,
          healthCheckRating: rating,
          diagnosisCodes,
          type: 'HealthCheck'
        });
        break;
        case 'hospital':
          onSubmit({
            description,
            date,
            specialist,
            diagnosisCodes,
            type: 'Hospital',
            discharge: {
              date: dischargeDate, 
              criteria}
          });
          break;
          case 'occupationalHealthcare':
            onSubmit({
              description,
              date,
              specialist,
              diagnosisCodes,
              employerName: employer,
              type: 'OccupationalHealthcare',
              sickLeave: {
                startDate: sickLeaveStart,
                endDate: sickLeaveEnd
              }
            });
            break;

    }


  };


  return (
    <div>
            <InputLabel >Entry Type</InputLabel>
            <Select
                label="entryType"
                fullWidth
                value={entryType}
                onChange={({ target }) => setEntryType(target.value)}
            >
                <MenuItem key="healthcheck" value="healthcheck">Health Check</MenuItem>
                <MenuItem key="hospital" value="hospital">Hospital</MenuItem>
                <MenuItem key="occupationalHealthcare" value="occupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(', '))}
        />
        {(entryType === 'healthcheck') && 
          <TextField
            label="Healthcheck rating"
            fullWidth
            value={rating}
            onChange={({ target }) => setRating(Number(target.value))}
          />}
        {(entryType === 'hospital') && 
          <div>
            <TextField
              label="Discharge date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </div>
        }
        {(entryType === 'occupationalHealthcare') && 
          <div>
            <TextField
              label="Employer name"
              fullWidth
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
            />
            <TextField
              label="Sick leave start"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick leave end"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </div>
        }               
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;