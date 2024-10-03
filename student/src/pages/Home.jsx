import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div className='home'>
        <Link className='link-btn' to="/test-login"><button>Take The Test</button></Link>
    </div>
  )
}

export default Home