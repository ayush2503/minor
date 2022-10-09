import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Component/Home'
import MyProblems from './Component/MyProblems/MyProblems'
import ResponsiveAppBar from './Component/Navbar'
import Test from './Component/test'

function App() {
  return (
    <div>
       <ResponsiveAppBar/>
       <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/my_problems" element={<MyProblems/>} />
                
                <Route path="/err" element={<Test/>} />
      </Routes>
    </div>
  )
}


export default App
