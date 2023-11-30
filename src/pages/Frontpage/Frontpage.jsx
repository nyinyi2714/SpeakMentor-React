import React from 'react'
import { Link } from "react-router-dom";
import "./Frontpage.css";
import Navbar from "../../components/Navbar/Navbar";

const Frontpage = () => {

    const nav_homepage = () => {
        window.location.href = "/homepage";
    }

    const nav_assessment = () => {
        window.location.href = "/analyze-sentences";
    }

  return (
    <div className='frontpage'>
        <Navbar />
        <div className='welcome-div'>
            <div>
                <h1 className='title'>Welcome to <br/></h1>
            </div>
            <div className="logo">
                <Link to="/"><img src="/images/main-logo-alt.png" alt="logo" /></Link>
            </div>
            <div className='button-div'>
                <button className='nav-homepage' onClick={nav_homepage}>Words</button>
                <button className='nav-assessment' onClick={nav_assessment}>Sentences</button>
            </div>
        </div>
        <div className='about-div'>
            <h1 className='about'>About</h1>
            <p className='about-text'>
            Welcome to Speak Mentor, your go-to online platform for mastering English pronunciation and accent reduction. Discover and learn the correct pronunciation of words with our easy-to-use search feature. Enhance your speaking skills further by practicing unscripted sentences and receive personalized feedback on the areas where you need improvement.
            </p>
        </div>
    </div>
  )
}

export default Frontpage
