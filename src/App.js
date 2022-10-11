import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Component/Home'
import MyProblems from './Component/MyProblems/MyProblems'
import ResponsiveAppBar from './Component/Navbar'
import Test from './Component/test'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my_problems" element={<MyProblems />} />

        <Route path="/err" element={<Test />} />
      </Routes>
      <ToastContainer position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
       
      />
    </div>
  )
}


export default App
