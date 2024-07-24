import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../../api/axios"
import MovieModal from './../../components/MovieModal'
import useDebounce from './../../hooks/useDebounce';
import "./SearchPage.css"

const SearchPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [movieSelected, setMoviesSelected] = useState({})
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

  // url 검색어 가져오기
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery()
  const searchTerm = query.get("q")
  const debounceSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if(debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm)
    }

  },[debounceSearchTerm])

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`)
      setSearchResults(response.data.results)
    } catch(error) {
      console.log(error)
    }
  }

  // 영화 클릭, 모달 오픈
  const handleClick = movie => {
    console.log(movie)
    setMoviesSelected(movie)
    setModalOpen(true)
  }

  if(searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            return (
              <div className="movie" key={movie.id}>
                <div className="movie__column-poster" onClick={() => handleClick(movie)} >
                  <img src={movieImageUrl} alt="movie" className="movie__poster" />
                  <p className="movie__title">{movie.title? movie.title :movie.name}</p>
                </div>
              </div>
            )
          }
        })}
        
        {modalOpen && 
          <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        }
      </section>
    )
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          {searchTerm && (
            <p>찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
          )}
        </div>
      </section>
    )
  }
}

export default SearchPage