import React, { useRef } from 'react'
import './Home.css'
import DefualtLayout from '../DefualtLayout'
import herobanner from '../../pictures/herobanner.png'
import { Link } from 'react-router-dom'

const HomeLandingPage = () => {
  const myRef = useRef();


  return (

    <div>
      <DefualtLayout>

        <div className="hero-section">

          <div className="container-hero">

            <div className="hero-content">
              <h2 className="h1 hero-title">Rent a car and find greate deals with us </h2>

              <h2 className="hero-text">
                Choose from our collection of cars
              </h2>

              <div className='landingBtns'>

                <Link to={'/register'}>
                  <button className='herobtn btn1'>Sign Up</button>
                </Link>

                <Link to={'/login'}>
                <button className='herobtn btn1'>Sign In</button>
                </Link>

              </div>



            </div>

            <div className="hero-banner">

              <img src={herobanner} alt="Hero Banner" className='heroBannersrc' />


            </div>



          </div>



        </div>

      </DefualtLayout>
    </div>

  )
}

export default HomeLandingPage