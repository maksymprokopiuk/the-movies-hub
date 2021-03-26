import React, { useState, useEffect } from 'react'
import './MovieDetail.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import noimage from '../../img/no-image.jpg'
import favouriteLogoBlack from '../../img/favorite-black.svg'
import favouriteLogoWhite from '../../img/favorite-white.svg'


function MovieDetail(props) {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [genres, setGenres] = useState([])
  const [movie, setMovie] = useState({})
  const [currentMovieGenres] = useState([])
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [currentStatusFav] = useState(false)



  const fetchGenres = async () => {
    const fetchGenres = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    const genres = await fetchGenres.json()
    setGenres(genres.genres)
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoaded(true)
            setMovie(data)
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          },
          setFetching(false)
        )
      fetchRecommendedMovies()
  }, [fetching, props.match.url])


  const fetchRecommendedMovies = async () => {
    const fetchRecommendedMovies = await fetch(
      `https://api.themoviedb.org/3/movie/${props.match.params.id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&page=1`
    )
    const movies = await fetchRecommendedMovies.json()
    setRecommendedMovies(movies.results.slice(0, 5))
  }


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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div style={{ display: 'flex', justifyContent: 'center', margin: '.5rem' }}><div className="lds-facebook"><div></div><div></div><div></div></div></div>;
  } else {
    return (
      <div className='movie-detail'>
        <div className='movie-detail__container'>
          <div className='movie-detail__title'><h1>{movie.title}</h1></div>
          <div className="movie-detail__info">
            <div>Release date: {movie.release_date ? movie.release_date : 'Not realeased'}</div>
            <div>Vote rating: {movie.vote_average}</div>
          </div>
          <div className='movie-detail__tagline'>{movie.tagline}</div>
          <div className='movie-detail__genres'>genres: {currentMovieGenres.join(', ')}</div>
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
          {!recommendedMovies.length > 0
            ? <div className="recommended-movies__empty"></div>
            :
            <div>
              <div className='recommended-movies__title'>Recommended movies</div>
              <div className='recommended-movies__cards'>
                {recommendedMovies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    genres={genres}
                    addOrDelMovies={props.addOrDelMovies}
                    savedMoviesId={props.savedMoviesId}
                  />
                ))}
              </div>
            </div>
          }
        </div>

      </div>
    )
  }
}

export default MovieDetail