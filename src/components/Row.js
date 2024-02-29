import React, { useState, useEffect, useCallback } from 'react'
import axios from '../api/axios'
import MovieModal from './MovieModal'
import "./Row.css"

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [movieSelected, setMoviesSelected] = useState({})

  const fetchMovieData = useCallback(async () => {
    const request = await axios.get(fetchUrl)
    setMovies(request.data.results)
    return request
  }, [fetchUrl])

  useEffect(() => {
    fetchMovieData()
  }, [fetchMovieData])

  // 영화 클릭, 모달 오픈
  const handleClick = movie => {
    setMoviesSelected(movie)
    setModalOpen(true)
  }

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span 
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80
            }}
          >&lt;</span>
        </div>
        <div id={id} className="row__posters">
          {movies?.map(movie => (
            <img 
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
              alt={movie.title} 
              onClick ={() => { handleClick(movie) }}
            />
          ))}
        </div>

        <div className="slider__arrow-right">
          <span 
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth + 80
            }}
          >&gt;</span>
        </div>
      </div>

      {modalOpen && 
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      }
    </div>
  )
}

export default Row