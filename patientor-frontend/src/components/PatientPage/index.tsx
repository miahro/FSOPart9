import { useParams } from "react-router-dom"
import { Patient, Gender, Diagnosis } from "../../types";
import { DiagnoseListItem } from './DiagnoseList'

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
  //console.log('in PatientPage diagnoses: ', diagnoses)
  //console.log('in Patienes diagnose code Z57.1', diagnoses.find( d => d.code === 'Z57.1'))

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
            <DiagnoseListItem code = {code} diagnoses={diagnoses} />
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
