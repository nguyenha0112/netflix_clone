import { useState } from 'react'
import './App.css'
import { Router } from 'express'
import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'


import {HomePage} from './pages/HomePage.jsx'
import {LoginPage} from './pages/LoginPage.jsx'
import {SignUpPage} from './pages/SignUpPage.jsx'


function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();


  return (
    <div>
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}


export default App
