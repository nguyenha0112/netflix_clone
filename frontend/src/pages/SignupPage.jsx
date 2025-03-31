import { Link } from 'lucide-react'
import React from 'react'

const SignupPage = () => {
  return (
    <div className=' h-screen w-full hero-bg'>
      <header>
      <Link to="/" className="btn btn-ghost normal-case text-xl">
        <img src="/logos_netflix.png" alt="Logo" className="w-10 h-10 mr-2" />
      </Link>
      </header>
    </div>
  )
}

export default SignupPage