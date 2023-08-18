//import { useState } from "react";
import { useParams } from "react-router-dom"
//import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody, Icon } from '@mui/material';
//import axios from 'axios';

import { Patient, Gender } from "../../types";
//import { DriveFileMove } from "@mui/icons-material";
//import AddPatientModal from "../AddPatientModal";

//import HealthRatingBar from "../HealthRatingBar";

//import patientService from "../../services/patients";



interface Props {
  patients : Patient[]
}




const PatientPage = ({ patients } : Props) => {
  const param = useParams<{id: string}>()
  let id: string = ''
  if (param.id) {
    id = param.id
  } 
  
  const patient = patients.find(p => p.id === id)

  const genderIcon = (gender: Gender) => {
    if (gender === 'male') {
      return <span>&#9794;</span>;
    }
    else if (gender === 'female'){
      return <span>&#9792;</span>;
    } else {
      return <span>?</span>;
    }
  }


  if (patient && patient.name && patient.ssn && patient.occupation && patient.entries) {
  return (
    <div className="App">
      <h2>{patient.name} {genderIcon(patient.gender)}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation} </p>
      <h2>entries</h2>
      <div>
      {patient.entries.map(e => {
        return(
          <div key={e.id}>
          <p>{e.description}</p>
          <ul>
            {e.diagnosisCodes?.map(code => (
              <li key={code}>{code}</li>
            ))}
          </ul>
          </div>
        )
      })
    }

      </div>

    </div>
  );
  } else {
    return null
  }

};

export default PatientPage;
