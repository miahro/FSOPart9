import { useState, useEffect } from 'react';
import { getAll } from './services/diaryService'
import { DiaryEntry } from './types';
import { Diaries } from './components/diaries'

const App = () => {
//  const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAll().then(data => {
      setDiaries(data)
    })

  }, [])

//  console.log(diaries)
  return (
    <Diaries diaries={diaries} />
  )
}
export default App;
