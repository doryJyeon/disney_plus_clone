
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'
import "./DetailPage.css"

const DetailPage = () => {
  let { movieId } = useParams()
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`)
      setMovie(response.data)
    }

    fetchData()
  }, [movieId])

  if(!movie) return null

  return (
    <section>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="img" className="modal__poster-img" />
      <p className="movie__date">{movie.release_date} | {movie.runtime} min</p>
      <p className="movie__name">{movie.title? movie.title : movie.name}</p>
      <p className="movie__tagline">{movie.tagline}</p>
      <p className="movie__description">{movie.overview}</p>
    </section>
  )
}

export default DetailPage