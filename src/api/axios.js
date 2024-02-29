import axios from 'axios'

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "3bd543355fb4bc0db46f3a35a07926fa",
    language: "ko_KR"
  },
})

export default instance