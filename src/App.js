import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HeaderSection from './components/HeaderSection/HeaderSection'
import Home from './pages/Home/Home'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import About from './pages/About/About'
import Favorites from './pages/Favorites/Favorites'


function App() {
    return (
      <Router>
      <div className="App">
        <HeaderSection />
        <div className="wrapper">
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path='/favorites' component={ Favorites } />
            <Route path='/about' component={ About } />
            <Route path='/:id' exact component={ MovieDetail } />
          </Switch>
        </div>
      </div>
      </Router>
    );
}

export default App