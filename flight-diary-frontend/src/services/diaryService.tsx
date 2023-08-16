import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from '../types'
const baseUrl = 'http://localhost:3000/api/diaries'

export const getAll = async () => {
  return axios.get<DiaryEntry[]>(baseUrl).then(res => res.data)

}

export const createDiary = async (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
}
