import React, { useState, useEffect } from 'react'
import './Favorites.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import { Link } from 'react-router-dom'

function Favorites(props) {
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])


  const fetchGenres = async () => {
    const fetchGenres = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    const genres = await fetchGenres.json()
    setGenres(genres.genres)
    const movies = props.movies
    setMovies(movies)
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  return (
    <>
      {
        (movies.length < 0)
          ?
          <div className="favorite">
            <h3>
              Favorites page is empty. <Link to={'/'}>Let's go to search you favorite movies!</Link>
            </h3>
          </div>
          :
          <div className="movie-card-container">
            {movies.map(movie => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  genres={genres}
                  addOrDelMovies={props.addOrDelMovies}
                  savedMoviesId={props.savedMoviesId}
                />
              )
            })}
          </div>
      }
    </>
  )
}

export default Favorites