import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HeaderSection from './components/HeaderSection/HeaderSection'
import Home from './pages/Home/Home'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import Favorites from './pages/Favorites/Favorites'


function App() {
  const [movies, setMovies] = useState(getMoviesLocalStorage)
  const [savedMoviesId, setSavedMoviesId] = useState(getSavedIdLocalStorage)

  function getMoviesLocalStorage() {
    return localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []
  }

  function setMovieWithSave(newMovie) {
    setMovies(newMovie);
    localStorage.setItem('movies', JSON.stringify(newMovie))
  }

  function removeMovie(id) {
    const removedArr = [...movies].filter(movie => movie.id !== id);
    setMovieWithSave(removedArr);
  }

  function addOrDelMovies(movie) {
    let checkMovieAtStorage = movies.find(item => item.id === movie[0].id)
    if (!checkMovieAtStorage) {
      setMovieWithSave([...movies, ...movie])
    } else {
      removeMovie(movie[0].id)
    }
    setSavedMoviesId(getSavedIdLocalStorage)
  }

  function getSavedIdLocalStorage() {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'))
      const moviesId = movies.map(item => item.id)
      return moviesId
    } else {
      return []
    }
  }

  return (
    <Router>
      <div className="App">
        <HeaderSection />
        <div className="wrapper">
          <Switch>
            <Route
              path='/'
              exact
              render={props =>
                <Home
                  addOrDelMovies={addOrDelMovies}
                  savedMoviesId={savedMoviesId}
                  {...props}
                />
              }
            />
            <Route
              path='/favorites'
              render={props =>
                <Favorites
                  movies={movies}
                  addOrDelMovies={addOrDelMovies}
                  savedMoviesId={savedMoviesId}
                  {...props}
                />}
            />
            <Route
              path='/:id'
              exact
              render={props =>
                <MovieDetail
                  addOrDelMovies={addOrDelMovies}
                  savedMoviesId={savedMoviesId}
                  {...props}
                />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App