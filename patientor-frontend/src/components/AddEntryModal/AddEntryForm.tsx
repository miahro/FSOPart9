import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, MenuItem, InputLabel, Select, Input, OutlinedInput, ListItemText } from '@mui/material';

import { EntryWithoutId, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[]
}



const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
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

  const ratings = [
    HealthCheckRating.Healthy,
    HealthCheckRating.LowRisk,
    HealthCheckRating.HighRisk,
    HealthCheckRating.CriticalRisk
  ]

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
        <InputLabel>Entry date</InputLabel>
        <Input
          fullWidth
          value={date}
          type="date"
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) =>  setSpecialist(target.value)}
        />

        <InputLabel>Diagnosis codes</InputLabel>
                <Select
                    multiple
                    fullWidth
                    value={diagnosisCodes}
                    onChange={({ target }) => { typeof target.value === "string" ? setDiagnosisCodes(target.value.split(', '))
                              : setDiagnosisCodes(target.value) }}
                    input={<OutlinedInput/>}
                >
                {diagnoses.map((d) => (
                <MenuItem key={d.code} value={d.code}>
                    <ListItemText primary = {d.code} secondary={d.name}></ListItemText>
                </MenuItem>
                ))}
                </Select> 


        {/* <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(', '))}
        /> */}

        {/* {(entryType === 'healthcheck') && 
          <TextField
            label="Healthcheck rating"
            fullWidth
            value={rating}
            onChange={({ target }) => setRating(Number(target.value))}
          />} */}

        {(entryType === 'healthcheck') && 
          <div>
            <InputLabel>Health check rating</InputLabel>
                <Select
                    fullWidth
                    value={rating}
                    onChange={({ target }) => setRating(Number(target.value))}
                    input={<OutlinedInput/>}
                >
                {ratings.map((r) => (
                <MenuItem key={r} value={r}>
                    <ListItemText primary = {r} ></ListItemText>
                </MenuItem>
                ))}
                </Select> 
          </div>}

        {(entryType === 'hospital') && 
          <div>
            <InputLabel>Discharge date</InputLabel>
            <Input
              fullWidth
              type="date"
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
        <InputLabel>Sick leave</InputLabel>
        <InputLabel>start</InputLabel>
            <Input
              fullWidth
              type="date"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <InputLabel>end</InputLabel>
            <Input
              //label="Sick leave end"
              fullWidth
              type="date"
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