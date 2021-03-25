import React, { useEffect, useState } from 'react'
import './MovieCard.css'
import favouriteLogoBlack from './favorite-black.svg'
import favouriteLogoWhite from './favorite-white.svg'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


function MovieCard({ movie, genres }) {
  const [genresList, setGenresList] = useState(['no genres'])

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

  //* localstorage
  const [currentStatusFav, setCurrentStatusFav] = useState(false)
  //* localstorage END

  const styles = {
    link: {
      textDecoration: 'none',
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-card__like_btn">
        <img src={currentStatusFav ? favouriteLogoBlack : favouriteLogoWhite} alt="Favourite Logo" />
      </div>
      <Link style={styles.link} to={`/${movie.id}`}>
        <div className="movie-card__img" >
          <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="Jack" />
        </div>
        <div className="movie-card__title">{movie.title}</div>
        {/* <div className="movie-card__genre">{movie.genre_ids}</div> */}
        <div className="movie-card__genre">{genresList.join(', ')}</div>
        {/* <div className="movie-card__year">{movie.release_date.split('-')[0]}</div> */}
        <div className="movie-card__year">{movie.release_date ? movie.release_date.split('-')[0] : 'Not released'}</div>
      </Link>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieCard