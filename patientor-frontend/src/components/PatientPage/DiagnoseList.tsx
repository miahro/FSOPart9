import { Diagnosis } from "../../types"

interface Props {
  code: string;
  diagnoses: Diagnosis[];
}

export const DiagnoseListItem = ( {code, diagnoses }: Props) => {
  const diagnose = diagnoses.find(d => d.code === code)

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