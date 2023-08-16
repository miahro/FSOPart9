import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/diaries'

export const getAll = async () => {
  return axios.get(baseUrl).then(res => res.data)

}

