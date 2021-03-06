import React, { useEffect, useState } from 'react'
import './MovieCard.css'
import { Link } from 'react-router-dom'
import noimage from '../../img/no-image.jpg'
import favouriteLogoBlack from '../../img/favorite-black.svg'
import favouriteLogoWhite from '../../img/favorite-white.svg'
import PropTypes from 'prop-types'


function MovieCard({ movie, genres, addOrDelMovies, savedMoviesId }) {
  const [genresList, setGenresList] = useState([])
  const [currentStatusFav, setCurrentStatusFav] = useState(savedMoviesId.includes(movie.id))

  useEffect(() => {
    setCurrentStatusFav(savedMoviesId.includes(movie.id))
  }, [savedMoviesId])
  

  function getNameGenres(movieProps, genresProps) {
    let newGenres = []
    const count = movieProps.genre_ids.length >= 2 ? 2 : movieProps.genre_ids.length
    for (let i = 0; i < count; i++) {
      newGenres.push(Object.values(genresProps)
        .filter(item => (item.id === movieProps.genre_ids[i]))
        .map(genre => genre.name)
      )
    }
    setGenresList(newGenres)
  }

  useEffect(() => {
    getNameGenres(movie, genres)
  }, [])

  function onFavorite() {
    addOrDelMovies(
      [{
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        genre_ids: movie.genre_ids,
        release_date: movie.release_date,
      }]
    )
  }

  return (
    <div className="movie-card">
      <div className="movie-card__like_btn" onClick={onFavorite}>
        <img src={currentStatusFav ? favouriteLogoBlack : favouriteLogoWhite} alt="Favourite Logo" />
      </div>
      <Link to={`/${movie.id}`}>
        <div className="movie-card__img" >
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noimage}
            alt={movie.title}
          />
        </div>
        <div className="movie-card__title">{movie.title ? movie.title : 'no title'}</div>
        <div className="movie-card__genre">{genresList.length > 0 ? genresList.join(', ') : 'no genres'}</div>
        <div className="movie-card__year">{movie.release_date ? movie.release_date.split('-')[0] : 'Not released'}</div>
      </Link>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieCard