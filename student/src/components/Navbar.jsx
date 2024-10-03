import React from 'react'
import Home from '../pages/Home'
import {Routes,Route,Link} from 'react-router-dom'
import TakeTest from '../pages/TakeTest'
import TestLogin from '../pages/TestLogin'
function Navbar() {
  return (<>
    <div className='navbar'>
        <h1>JHC Test</h1>
    </div>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/take-test" element={<TakeTest/>}/>
        <Route path="/test-login" element={<TestLogin/>}/>
    </Routes>
    </>
  )
}

export default Navbar