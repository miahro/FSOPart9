import { DiaryEntry } from "../types"


export const Diaries = ( { diaries }: { diaries: DiaryEntry[] }): JSX.Element => {

  return (
    <div>
      <h2>Diary entries</h2>
      { diaries.map((d) => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>visibility: {d.visibility}<br></br>
          weather: {d.weather}<br></br>
          comment: {d.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default Diaries