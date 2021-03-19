import React from 'react'
import './MovieCard.css'
// import favouriteLogoBlack from './favorite-black.svg'
import favouriteLogoWhite from './favorite-white.svg'
import PropTypes from 'prop-types'

function MovieCard({movie}) {
  return (
    <div className="movie-card">
      <div className="movie-card__like_btn">
        <img src={favouriteLogoWhite} alt="Favourite Logo" />
      </div>
      <div className="movie-card__img" >
        <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="Jack" />
      </div>
      <div className="movie-card__title">{movie.title}</div>
      <div className="movie-card__genre">{movie.genre_ids}</div>
      <div className="movie-card__year">{movie.release_date.split('-')[0]}</div>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieCard