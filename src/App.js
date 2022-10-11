import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Component/Home'
import MyProblems from './Component/MyProblems/MyProblems'
import ResponsiveAppBar from './Component/Navbar'
import Test from './Component/test'
import 'react-toastify/dist/ReactToastify.css';
import Protected from './helpers/Protected/Protected'
import { useSelector } from 'react-redux'
function App() {
  const{isAuthenticated}=useSelector(state=>state.authDetails)
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/my_problems" element={ 
              <Protected isLoggedIn={isAuthenticated}>
                <MyProblems /> 
              </Protected>
          } />
      </Routes>
      <ToastContainer position="bottom-center"
        autoClose={500}
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
