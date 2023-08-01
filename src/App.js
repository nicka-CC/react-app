import React, { useEffect, useRef, useState } from 'react'
import './styles/App.css'
import {render} from 'react-dom'
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import About from './pages/About';
import Posts from './pages/Posts';
import Navbar from './components/UI/Navbar/Navbar';
import PostIdPage from './pages/PostPage';



function App() {
  return(
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/posts/:id" element={<PostIdPage />} />
        </Routes>
      
    </BrowserRouter>
  )
}

export default App;