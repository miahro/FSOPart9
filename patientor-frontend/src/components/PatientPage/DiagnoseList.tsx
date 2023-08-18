import { Diagnosis } from "../../types"

interface Props {
  code: string;
  diagnoses: Diagnosis[];
}

export const DiagnoseListItem = ( {code, diagnoses }: Props) => {
  //console.log(code)
  //console.log(diagnoses)
  //console.log(diagnoses.find(d => d.code === code))
  const diagnose = diagnoses.find(d => d.code === code)
  console.log('code', code, 'd: ', diagnose)

  if (code && diagnose && diagnose.name){
    return (
      <li>
        {code} &nbsp;
        {diagnose.name}
      </li>
    )
  }
  return null
} 

export default DiagnoseListItem