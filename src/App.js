import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HeaderSection from './components/HeaderSection/HeaderSection'
import Home from './pages/Home/Home'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import Favorites from './pages/Favorites/Favorites'


function App() {
  const [movies, setMovies] = useState([
    // {
    //   id: 791373,
    //   title: "Zack Snyder's Justice League",
    //   poster_path: "/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg",
    //   genre_ids: [
    //     28,
    //     12,
    //     14,
    //     878
    //   ],
    //   release_date: "2021-03-18",
    // },
    // {
    //   id: 581389,
    //   title: "Space Sweepers",
    //   poster_path: "/lykPQ7lgrLJPwLlSyetVXsl2wDf.jpg",
    //   genre_ids: [
    //     18,
    //     14,
    //     878,
    //   ],
    //   release_date: "2021-02-05",
    // }
  ])

  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = async () => {
    const fetchGenres = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    const genres = await fetchGenres.json()
    setGenres(genres.genres)
  }

    return (
      <Router>
      <div className="App">
        <HeaderSection />
        <div className="wrapper">
          <Switch>
            <Route path='/' exact component={ Home } />
            {/* <Route path='/favorites' component={ Favorites } /> */}
            <Route
              path='/favorites'
              render={props => <Favorites movies={movies} genres={genres} {...props} />}
            />
            <Route path='/:id' exact component={ MovieDetail } />
          </Switch>
        </div>
      </div>
      </Router>
    );
}

export default App