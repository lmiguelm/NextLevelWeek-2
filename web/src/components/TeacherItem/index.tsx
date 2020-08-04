import React from 'react'

import WhatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem(){
    return(
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/47677312?s=460&u=b07e6ae92a2f7fe747602d7a3d0fca0698812875&v=4" alt="Luis Miguel" />
                <div>
                    <strong>Luis Miguel</strong>
                    <span>ReactJs</span>
                </div>
            </header>

            <p>
                Lorem Ipsum é simplesmente uma simulação
                <br /><br />
                ipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={ WhatsappIcon } alt="WhatsApp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem





