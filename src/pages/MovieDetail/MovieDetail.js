import React, { useState, useEffect } from 'react'
import './MovieDetail.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import { Link } from 'react-router-dom'

function MovieDetail({ match }) {
  useEffect(() => {
    fetchMovie()
    fetchRecommendedMovies()
  }, [])

  const [movie, setMovie] = useState({})

  const fetchMovie = async () => {
    const fetchMovie = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`)
    const movie = await fetchMovie.json()
    setMovie(movie)
  }

  const [recommendedMovies, setRecommendedMovies] = useState([])

  const fetchRecommendedMovies = async () => {
    const fetchRecommendedMovies = await fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&page=1`
    )
    const movies = await fetchRecommendedMovies.json()
    setRecommendedMovies(movies.results.slice(0, 5))
  }
  // console.log(recommendedMovies)

  return (
    <div className='movie-detail'>
      <div className='movie-detail__title'><h1>{movie.title}</h1></div>
      <div className='movie-detail__tagline'>{movie.tagline}</div>
      <div>genres: </div>
      <div className='movie-detail__image'><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /></div>
      <div>overview: {movie.overview}</div>
      <div>release_date: {movie.release_date}</div>
      <div>vote_average: {movie.vote_average}</div>
      <div className='recommended-movies'>
        <div className='recommended-movies__title'>списком рекомендованих (схожих) фільмів</div>
        <div className='recommended-movies__cards'>
          {recommendedMovies.map(movie => {
            return (
              // <Link key={movie.id} to={`/${movie.id}`}>
              //   <MovieCard movie={movie} />
              // </Link>
              <a key={movie.id} href={`/${movie.id}`}>
              <MovieCard movie={movie} />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MovieDetail