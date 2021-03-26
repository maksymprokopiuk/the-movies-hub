import React from 'react'
import './HeaderSection.css'
import { Link } from 'react-router-dom'

function HeaderSection() {
  return (
    <nav>
      <ul className="nav-links">
        <Link to="/"><li>The Movies Hub</li></Link>
        <Link to="/favorites"><li>Favorites</li></Link>
      </ul>
    </nav>
  )
}

export default HeaderSection