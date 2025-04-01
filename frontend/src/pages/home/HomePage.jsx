import React from 'react'
import Homescrren from './Homescreen.jsx'
import Authscreen from './Authscreen.jsx'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const user = false;
  return (
    <div >
      {user ? <Homescrren/> : <Authscreen/>}
    </div>
  )
}

export default HomePage