import { useState } from "react";
import { useParams } from "react-router-dom"
import { Button } from '@mui/material';
import { Patient, Gender, Diagnosis, EntryWithoutId } from "../../types";
import { EntryPage } from './Entry'
import AddEntryModal from "../AddEntryModal"
import patientService from '../../services/patients'
import axios from 'axios'


interface Props {
  patients : Patient[];
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patients, diagnoses } : Props) => {
  const param = useParams<{id: string}>()
  let id: string = ''
  if (param.id) {
    id = param.id
  } 
  
  const patient = patients.find(p => p.id === id)

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const entry = await patientService.createEntry(id, values);
      patient?.entries.concat(entry)
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };



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

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>

      <h2>entries</h2>
      <div>
      {patient.entries.map(e => {
        return(
          <div key={e.id}>
          <EntryPage entry={e} diagnoses={diagnoses} />
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
