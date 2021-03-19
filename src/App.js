import React, { useState, useEffect } from 'react' //Component
import './App.css';
import MovieCard from './MovieCard/MovieCard'
// import logo from './logo.svg';
import PropTypes from 'prop-types'

// !
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(
        (result) => {
          setTimeout(() => {
            setIsLoaded(true);
            setItems(result.results);
          }, 3000);
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
          {items.map(movie => {
            return <MovieCard movie={movie} key={movie.id} />
          })}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
}

export default App
// !

// !
// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       error: null,
//       isLoaded: false,
//       films: [],
//     }
//   }

//   componentDidMount() {
//     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
//     .then(res => res.json())
//     .then(
//       (result) => {
//         this.setState({
//           isLoaded: true,
//           films: result.results
//         })
//       },
//       (error) => {
//         this.setState({
//           isLoaded: true,
//           error
//         })
//       }
//     )
//   }

//   render() {
//     const { error, isLoaded, films } = this.state
//     if (error) {
//       return <p>Error {error.message}</p>
//     } else if (!isLoaded) {
//       return <p>Loading</p>
//     } else {
//       return (
//         <div className="App">
//           <div className="wrapper">
//             {films.map(movie => {
//               return <MovieCard movie={movie} key={movie.id} />
//             })}
//           </div>
//         </div>
//       )
//     }
//   }
// }

// export default App
// !

// function App() {
//   let moviesList = [
//     {
//       id: 1,
//       img: 'https://image.tmdb.org/t/p/w500/7baSUtFKi8PQ9SLo6ECYBfAW2K8.jpg',
//       title: 'Jack Reacher Collection',
//       genre: 'Action',
//       year: '2016',
//     },
//     {
//       id: 2,
//       img: 'https://image.tmdb.org/t/p/w500/nWBPLkqNApY5pgrJFMiI9joSI30.jpg',
//       title: 'Coming 2 America',
//       genre: 'Comedy',
//       year: '2021',
//     },
//   ]

//   return (
//     <div className="App">
//       <div className="wrapper">
//         { moviesList.map(movie => {
//           return <MovieCard movie={movie} key={movie.id} />
//         }) }
//       </div>

//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }

// App.propTypes = {
//   moviesList: PropTypes.arrayOf(PropTypes.object)
// }

// export default App;
