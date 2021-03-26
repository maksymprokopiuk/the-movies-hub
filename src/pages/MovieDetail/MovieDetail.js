import React, { useState, useEffect } from 'react'
import './MovieDetail.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import noimage from '../../img/no-image.jpg'
import favouriteLogoBlack from '../../img/favorite-black.svg'
import favouriteLogoWhite from '../../img/favorite-white.svg'


function MovieDetail(props) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = async () => {
    const fetchGenres = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    const genres = await fetchGenres.json()
    setGenres(genres.genres)
  }

  useEffect(() => {
    fetchMovie()
    fetchRecommendedMovies()
  }, [props.match.url])
  
  const [movie, setMovie] = useState({})

  const fetchMovie = async () => {
    const fetchMovie = await fetch(`https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`)
    const movie = await fetchMovie.json()
    setMovie(movie)
  }

  const [recommendedMovies, setRecommendedMovies] = useState([])

  const fetchRecommendedMovies = async () => {
    const fetchRecommendedMovies = await fetch(
      `https://api.themoviedb.org/3/movie/${props.match.params.id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&page=1`
    )
    const movies = await fetchRecommendedMovies.json()
    setRecommendedMovies(movies.results.slice(0, 5))
  }
  

  const [currentStatusFav, setCurrentStatusFav] = useState(false)

  const onFavorite = () => {
    const genre_ids = movie.genres.map(item => item.id)
    props.addOrDelMovies(
      [{
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        genre_ids: genre_ids,
        release_date: movie.release_date,
      }]
    )
  }

  return (
    <div className='movie-detail'>
      <div className='movie-detail__container'>
      <div className='movie-detail__title'><h1>{movie.title}</h1></div>
      <div className="movie-detail__info">
        <div>Release date: {movie.release_date ? movie.release_date : 'Not realeased'}</div>
        <div>Vote reting: {movie.vote_average}</div>
      </div>
      <div className='movie-detail__tagline'>{movie.tagline}</div>
      <div className='movie-detail__image'>
      <div className="movie-detail__like_btn" onClick={onFavorite}>
        <img src={currentStatusFav ? favouriteLogoBlack : favouriteLogoWhite} alt="Favourite Logo" />
      </div>
        <img
          src={
            movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : noimage
          }
          alt={movie.title}
        />
      </div>
      <div>Overview:</div>
      <div className='movie-detail__overview'>{movie.overview}</div>
      </div>
      <div className='recommended-movies'>
        <div className='recommended-movies__title'>Recommended movies</div>
        <div className='recommended-movies__cards'>
          {recommendedMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={genres}
              addOrDelMovies={props.addOrDelMovies}
              savedMovies={props.savedMovies}
            />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default MovieDetail