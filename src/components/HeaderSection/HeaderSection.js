import React from 'react'
import './HeaderSection.css'
import { Link } from 'react-router-dom'

function HeaderSection() {
  const styles = {
    link: {
      color: 'white',
      textDecoration: 'none',
    }
  }

  return (
    <nav>
      <Link style={styles.link} to="/"><span>The Movies Hub</span></Link>
      <ul className="nav-links">
        <Link style={styles.link} to="/about"><li>About</li></Link>
        <Link style={styles.link} to="/favorites"><li>Favorites</li></Link>
      </ul>
    </nav>
  )
}

export default HeaderSection