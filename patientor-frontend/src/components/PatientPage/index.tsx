//import { useState } from "react";
import { useParams } from "react-router-dom"
//import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody, Icon } from '@mui/material';
//import axios from 'axios';

import { Patient, Gender } from "../../types";
//import AddPatientModal from "../AddPatientModal";

//import HealthRatingBar from "../HealthRatingBar";

//import patientService from "../../services/patients";



interface Props {
  patients : Patient[]
}




const PatientPage = ({ patients } : Props) => {
  //console.log(id)
  //const [error, setError] = useState<string>();
  //const [patient, setPatient] = useState<Patient>();

  //console.log('patients: ', patients)


  const param = useParams<{id: string}>()
  //console.log(param)
  let id: string = ''
  if (param.id) {
    id = param.id
  } 
  
  //const patient = patientService.getId(String(id))
  const patient = patients.find(p => p.id === id)
  //const patient = patientService.getId(id)
  //console.log('patient: ', patient)

  // interface genderIconProps {
  //   gender: 'male' | 'female' | 'other'
  // }

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



 // console.log(patient?.name)

  // if (!id) {
  //   setError('id not found')
  // } else {
  //  //console.log(patientService.getId(id));
  //   const patient = patientService.getId(id)
  //   console.log(patient)
  // }



  // const [modalOpen, setModalOpen] = useState<boolean>(false);


  // const openModal = (): void => setModalOpen(true);

  // const closeModal = (): void => {
  //   setModalOpen(false);
  //   setError(undefined);
  // };

  // const submitNewPatient = async (values: PatientFormValues) => {
  //   try {
  //     const patient = await patientService.create(values);
  //     setPatients(patients.concat(patient));
  //     setModalOpen(false);
  //   } catch (e: unknown) {
  //     if (axios.isAxiosError(e)) {
  //       if (e?.response?.data && typeof e?.response?.data === "string") {
  //         const message = e.response.data.replace('Something went wrong. Error: ', '');
  //         console.error(message);
  //         setError(message);
  //       } else {
  //         setError("Unrecognized axios error");
  //       }
  //     } else {
  //       console.error("Unknown error", e);
  //       setError("Unknown error");
  //     }
  //   }
  // };


  if (patient && patient.name && patient.ssn && patient.occupation) {
  return (
    <div className="App">
      {/* <Box>
        <Typography align="left" variant="h6">
          Patient list
        </Typography>
      </Box> */}
      <h2>{patient.name} {genderIcon(patient.gender)}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation} </p>

      {/* <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      {/* <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient x
      </Button> */}
    </div>
  );
  } else {
    return null
  }

};

export default PatientPage;
