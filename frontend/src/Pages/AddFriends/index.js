import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import ImageUser from '../../assets/default-user-image.png'
import './style.css'

const AddFriends = () => {

    const [valueSearch, setValueSearch] = useState('')
    const [searching, setSearching] = useState(false)
    const [usersSearch, setUserSearch] = useState([])

    async function getUsers(){
        setSearching(true)
        const result = await api.get(`http://localhost:3001/users/search?value=${valueSearch}`)
        setUserSearch(result.data)
        setSearching(false)
    }

    function handleSearch(e){
        if(e.target.name === 'search'){
            getUsers()
        }
        else if(e.key === 'Enter'){
            getUsers()
        }
    }

    return (
        <div className="add-friends">
            <div className="add-friends-container">
                <div className="add-friends-header">
                    <Link class="btn-back" to="/chat">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                        <p>Voltar</p>
                    </Link>
                    <div className="input-container">
                        <input 
                            placeholder="Pesquise o nome ou email" 
                            type="text" 
                            onChange={(e) => setValueSearch(e.target.value)} 
                            onKeyPress={(e) => handleSearch(e)} 
                        />
                        <button name="search" onClick={handleSearch}>
                            <ion-icon name="search"></ion-icon>
                        </button>
                    </div>
                </div>
                <div className="add-friends-content">
                    <h1>Pessoas que você talvez conheça</h1>
                    { searching && <h1>Carregando...</h1> }
                    <div className="peoples">
                        {
                            usersSearch.length > 0 && usersSearch.map(user => (
                                <div key={user.id} class="people">
                                    <img src={ImageUser} alt="" />
                                    <h1>{user.name}</h1>
                                    <p>{user.email}</p>
                                    <button>Enviar Solicitação</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFriends