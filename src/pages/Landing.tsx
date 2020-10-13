import React from 'react';
import {Link} from 'react-router-dom'
import "../styles/pages/landing.css"
import LogoImg from "../images/logo.svg"
import {FiArrowRight} from 'react-icons/fi'

function Landing (){

  return (
    <div className="container">
      <div id="page-lading">
        <div className="content-wrapper">
        <img src={LogoImg} alt="Logo Happy"/>

        <main>
          <h1>Leve felicidade para o mundo!</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Teixeira de Freitas</strong>
          <span>Bahia</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color='rgba(0,0,0,0.5)'/>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing;