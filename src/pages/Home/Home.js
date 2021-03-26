import React, { useState, useEffect } from 'react'
import './Home.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import PropTypes from 'prop-types'


function Home(props) {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [searchWord, setSearchWord] = useState('')
  const [genres, setGenres] = useState([])



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




  function getSearchWord() {
    setCurrentPage(1)
    setMovies([])
    setSearchWord(document.querySelector('#inputSearch').value)
  }

  useEffect(() => {
    if (searchWord) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchWord}&page=${currentPage}`)
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setMovies([...movies, ...data.results]);
            setCurrentPage(currentPage + 1)
            setTotalCount(data.total_results)
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          },
          setFetching(false)
        )
    } else {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`)
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setMovies([...movies, ...data.results]);
            setCurrentPage(currentPage + 1)
            setTotalCount(data.total_results)
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          },
          setFetching(false)
        )
    }
  }, [fetching, searchWord])




  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
      && movies.length < totalCount
    ) {
      setFetching(true)
    }
  }




  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div style={{display: 'flex', justifyContent: 'center', margin: '.5rem'}}><div className="lds-facebook"><div></div><div></div><div></div></div></div>;
  } else {
    return (
      <div>
        <div className="search-block">
          <input type="text" name="search" id="inputSearch" />
          <button onClick={getSearchWord} >Search</button>
        </div>
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
      </div>
    );
  }
}

Home.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
}

export default Home