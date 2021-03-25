import React, { useState, useEffect } from 'react'
import './Favorites.css'
import MovieCard from '../../components/MovieCard/MovieCard'

function Favorites() {
  const [movies, setMovies] = useState([
    {
      id: 791373,
      title: "Zack Snyder's Justice League",
      poster_path: "/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg",
      genre_ids: [
        28,
        12,
        14,
        878
      ],
      release_date: "2021-03-18",
    },
    {
      id: 581389,
      title: "Space Sweepers",
      poster_path: "/lykPQ7lgrLJPwLlSyetVXsl2wDf.jpg",
      genre_ids: [
        18,
        14,
        878,
      ],
      release_date: "2021-02-05",
    }
  ])
  
  // =========================================
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
  // <MovieCard key={movie.id} movie={movie} genres={genres}/>
  // =========================================
  
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div style={{display: 'flex', justifyContent: 'center', margin: '.5rem'}}><div className="lds-facebook"><div></div><div></div><div></div></div></div>;
  // } else 
  if (!(movies.length > 0)) {
    return <div className="favorite"><h3>Favorites page is empty</h3></div>
  } else {
    return (
      <div className="movie-card-container">
        {movies.map(movie => {
            return (
              <MovieCard key={movie.id} movie={movie} genres={genres} />
            )
          })}
      </div>
    )
  }
}

export default Favorites