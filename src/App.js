import React, { useState, useEffect } from 'react' //Component
import './App.css';
import MovieCard from './MovieCard/MovieCard'
// import logo from './logo.svg';
import PropTypes from 'prop-types'


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div style={{display: 'flex', justifyContent: 'center', margin: '.5rem'}}><div className="lds-facebook"><div></div><div></div><div></div></div></div>;
  } else {
    return (
      <div className="App">
        <div className="wrapper">
          <div className="movie-card-container">
            {items.map(movie => {
              return <MovieCard movie={movie} key={movie.id} />
            })}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
}

export default App