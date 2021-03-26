import React, { useState } from 'react'
import './Favorites.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import { Link } from 'react-router-dom'

function Favorites(props) {
  const [genres, setGenres] = useState([props.genres])

  if (!(props.movies.length > 0)) {
    return (
    <div className="favorite">
      <h3>Favorites page is empty. <Link to={'/'}>Let's go to search you favorite movies!</Link>
      </h3>
    </div>
    )
  } else {
    return (
      <div className="movie-card-container">
        {props.movies.map(movie => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                genres={genres}
                addOrDelMovies={props.addOrDelMovies}
              />
            )
          })}
      </div>
    )
  }
}

export default Favorites