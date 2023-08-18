import { useParams } from "react-router-dom"
import { Patient, Gender, Diagnosis } from "../../types";
import { EntryPage } from './Entry'

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
