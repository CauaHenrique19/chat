import React, { useContext } from 'react'
import { Context } from '../../context/context'

import ImageUser from '../../assets/default-user-image.png'
import './style.css'

const SolicitationsList = () => {

    const { setViewingSolicitations } = useContext(Context)

    return (
        <div className="solicitations-list">
            <div className="header-solicitations">
                <h1>Solicitações</h1>
                <button className="button-close" onClick={() => setViewingSolicitations(false)}>
                    <ion-icon name="close-outline"></ion-icon>
                </button>
            </div>
            <div className="solicitations">
                <div className="solicitation">
                    <div className="user-info">
                        <img src={ImageUser} alt="user" />
                        <div>
                            <h2>Usuário</h2>
                            <p>usuario@email.com</p>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <button className="btn-accept">
                            <ion-icon name="checkmark-outline"></ion-icon>
                        </button>
                        <button className="btn-recuse">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SolicitationsList