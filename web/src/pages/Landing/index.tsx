import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClasssesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import api from '../../services/api'

import './styles.css'

export default function Landing(){

    const [connections, setConnections] = useState(0);
    
    useEffect(() => {
        api.get('connections').then(res => {
            setConnections(res.data.total);
        });
    }, [])

    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={ logoImg } alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img 
                    src={ landingImg } 
                    alt="Plataforma de estudos" 
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={ studyIcon } alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={ giveClasssesIcon } alt="Dar aulas"/>
                        Dar aulas
                    </Link>

                </div>

                <span className="total-connections">
                    Total de { connections } conexões já realizadas <img src={ purpleHeartIcon } alt="Coração roxo"/>
                </span>
            </div>
        </div>
    )
}