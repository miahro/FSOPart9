import { useState, useEffect } from 'react';
import { getAll, createDiary } from './services/diaryService'
import { DiaryEntry } from './types';
import { Diaries } from './components/diaries'
//import { DiaryForm } from './components/diaryForm'

const App = () => {
  //const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getAll().then(data => {
      setDiaries(data)
    })

  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary( {date, weather, visibility, comment } ).then(data => {
    setDiaries(diaries.concat(data))
    })
  }

  return (
    <div>
    <div>
    <h2>Add new entry</h2>
    <form onSubmit={diaryCreation}>
      <div>
    date: &nbsp;
        <input
          type="text"
          value={ date }
          name="date"
          id="date"
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <div>
    visibility: &nbsp;
        <input
          type="text"
          value={ visibility }
          name="visibility"
          id="visibility"
          onChange={({ target }) => setVisibility(target.value)}
        />
      </div>
      <div>
    weather: &nbsp;
        <input
          type="text"
          value={ weather }
          name="weather"
          id="weather"
          onChange={({ target }) => setWeather(target.value)}
        />
        </div>
        <div>
    comment: &nbsp;
        <input
          type="text"
          value={ comment }
          name="comment"
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
      </div>
      <button type="submit" id="create">create</button>
    </form>
  </div>
    <div>
    <Diaries diaries={diaries} />
    </div>
  </div>    

  )
}
export default App;
