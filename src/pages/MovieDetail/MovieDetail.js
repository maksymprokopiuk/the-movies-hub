import React, { useState, useEffect } from 'react'
import './MovieDetail.css'

function MovieDetail({ match }) {
  useEffect(() => {
    fetchMovie()
  }, [])

  const [movie, setMovie] = useState({})

  const fetchMovie = async () => {
    const fetchMovie = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`)
    const movie = await fetchMovie.json()
    // console.log(item)
    setMovie(movie)
  }

  return (
    <div className='movie-detail'>
      <div className='movie-detail__title'><h1>{movie.title}</h1></div>
      <div className='movie-detail__tagline'>{movie.tagline}</div>
      <div>genres: </div>
      <div className='movie-detail__image'><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/></div>
      <div>overview: {movie.overview}</div>
      <div>release_date: {movie.release_date}</div>
      <div>vote_average: {movie.vote_average}</div>
    </div>
  )
}

export default MovieDetail