import React from 'react'
import "../Styles/heroimage.css"
import { Link } from 'react-router-dom'
const Heroimage = () => {
  return (
    <div className="container">

    <div className='heroimage'>
        <img src="Images/collegeimage.jpg" alt="" />
    <div className="overlay"></div>
    </div>

    <div className="herotext">
        <h1>Welcome to Pascal College</h1>
        <p>Shaping Future Leaders with Knowledge and Integrity</p>
        <div className="btn">

        <Link to="/admission" className="herobtn"> Admissions</Link>
        </div>
      </div>
    </div>



  )
}

export default Heroimage