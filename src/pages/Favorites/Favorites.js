import React, { useState } from 'react'
import './Favorites.css'
import MovieCard from '../../components/MovieCard/MovieCard'

function Favorites(props) {
  const [genres, setGenres] = useState([props.genres])

  if (!(props.movies.length > 0)) {
    return <div className="favorite"><h3>Favorites page is empty</h3></div>
  } else {
    return (
      <div className="movie-card-container">
        {props.movies.map(movie => {
            return (
              <MovieCard key={movie.id} movie={movie} genres={genres} />
            )
          })}
      </div>
    )
  }
}

export default Favorites