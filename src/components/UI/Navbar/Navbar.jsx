import React from 'react'
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
const Navbar = () =>{
    return(
        <div className='navbar'>
        <div className='navbar__links'>
          <div className='navbar__btns'>
            <Link to="/about" className='navbar__btn'>about</Link>

            <Link className='navbar__btn' to="/posts">all</Link>
            
          </div>
        </div>
      </div>
    )
}
export default Navbar