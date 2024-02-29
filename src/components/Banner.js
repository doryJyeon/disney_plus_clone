import React, { useEffect, useState } from 'react'
import axios from './../api/axios';
import requests from './../api/request';
import styled from 'styled-components';
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([])
  const [isPlay, setIsPlay] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const request = await axios.get(requests.fetchNowPlaying)
    
    // 랜덤으로 영화 ID 가져오기
    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length)
    ].id
    
    // 랜덤 영화 상세 정보 가져오기
    const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
      params: {
        append_to_response: "videos"
      }
    })

    setMovie(movieDetail)
  }

  // 영화 설명 자르기
  const truncate = (str, cut) => str?.length > cut ? str.substring(0, cut - 1) + "..." : str

  if(isPlay) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&mute=1&loop=1&autoplay=1&playlist=${movie.videos.results[0].key}`}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setIsPlay(false)}>
          X
        </button>
      </>
    )
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>

          <div className="banner__buttons">
            {movie?.videos?.results[0]?.key &&
              <button
                className="banner__button play"
                onClick={() => {setIsPlay(true)}}
              >
                Play
              </button>
            }
          </div>

          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
        </div>

        <div className="banner--fadeBottom"></div>
      </header>
    )
  }
}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width:100%;
  height: 80vh;
`
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`