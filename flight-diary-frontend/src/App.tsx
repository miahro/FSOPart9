import { useState, useEffect } from 'react';
import { getAll, createDiary } from './services/diaryService'
import { DiaryEntry, ValidationError } from './types';
import { Diaries } from './components/diaries'
import axios, {AxiosError} from 'axios'
//import { DiaryForm } from './components/diaryForm'


const App = () => {
  //const [newDiary, setNewDiary] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
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



  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
   await createDiary( {date, weather, visibility, comment } )
      .then(data => {
      setDiaries(diaries.concat(data))
      setDate('')
      setWeather('')
      setVisibility('')
      setComment('')
      })
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        const e = error as AxiosError
        console.log(e)
        setErrorMsg(String(e.response?.data))
      } else {
        setErrorMsg('unknown error')
      }
      setTimeout(() => {
        setErrorMsg('')
      }, 5000)
    }}

  return (
    <div>
    <div>
    <h2>Add new entry</h2>
    {errorMsg && <p style={{color:'red'}}> {errorMsg}</p>}
    <form onSubmit={diaryCreation}>
      <div>
    date: &nbsp;
        <input
          type="date"
          value={ date }
          name="date"
          id="date"
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <div>
    visibility: &nbsp;
    great
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility("great")}
        />
      good
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility("good")}
        />
      ok
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility("ok")}
        />
      poor
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility("poor")}
        />

      </div>
      <div>
    weather: &nbsp;
    sunny
        <input
          type="radio"
          name="weather"
           onChange={() => setWeather("sunny")}
        />
    rainy
        <input
          type="radio"
          name="weather"
           onChange={() => setWeather("rainy")}
        />
    cloudy
        <input
          type="radio"
          name="weather"
           onChange={() => setWeather("cloudy")}
        />
    stormy
        <input
          type="radio"
          name="weather"
           onChange={() => setWeather("stormy")}
        />
    windy
        <input
          type="radio"
          name="weather"
           onChange={() => setWeather("windy")}
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
