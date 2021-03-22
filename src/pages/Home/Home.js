import React, { useState, useEffect } from 'react'
import './Home.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Home() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)


  useEffect(() => {
    // if (fetching) {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`)
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setMovies([...movies, ...data.results]);
            // setCurrentPage(prevState => prevState + 1)
            setCurrentPage(currentPage + 1)
            setTotalCount(data.total_results)
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          },
          setFetching(false)
        )
    // }
  }, [fetching])

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
    // console.log('scrollHandler', e.target.documentElement.scrollHeight) // загальна висота сторінки з розрахунком скрола
    // console.log('scrollTop', e.target.documentElement.scrollTop) // текущее положення скрола від верха сторінки
    // console.log('innerHeight', window.innerHeight) // висота видимої області сторінки (висота браузера)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div style={{display: 'flex', justifyContent: 'center', margin: '.5rem'}}><div className="lds-facebook"><div></div><div></div><div></div></div></div>;
  } else {
    return (
          <div className="movie-card-container">
            {movies.map(movie => {
              return (
                <Link key={movie.id} to={`/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              )
            })}
          </div>
    );
  }
}

Home.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
}

export default Home