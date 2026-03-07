import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex justify-around items-center'>
        <h1>NavBar</h1>
        <div className='flex gap-5'>
          <Link to={"/login"}>Login</Link>
          <Link to={"/sign-up"}>Sign Up</Link>
        </div>
    </div>
  )
}

export default NavBar