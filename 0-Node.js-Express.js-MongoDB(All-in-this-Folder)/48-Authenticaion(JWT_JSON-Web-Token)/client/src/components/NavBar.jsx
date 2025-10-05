import React from 'react'
import { Link } from 'react-router-dom'

const  NavBar = () => {
  return (
    <nav>
        <Link to="/">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
    </nav>
  )
}

export default NavBar;