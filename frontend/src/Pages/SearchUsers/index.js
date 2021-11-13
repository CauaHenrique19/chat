import { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'

import api from '../../services/api'

import noUsersImage from '../../assets/Telescope.png'
import './style.css'

const SearchUsers = ({ onClose }) => {

    const { user } = useContext(Context)
    const [stringSearch, setStringSearch] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])
    const [soliciteds, setSoliciteds] = useState([])

    function handleSolicitation(receiver_id){
        const solicitation = {
            requester_id: user.id,
            receiver_id
        }

        api.post('/friendship', solicitation)
            .then(res => {
                soliciteds.push(receiver_id)
                setSoliciteds(soliciteds)
                setSearchedUsers([...searchedUsers])
            })
            .catch(error => console.log(error.message))

    }

    useEffect(() => {
        if(stringSearch){
            api.get(`/users/search?value=${stringSearch}`)
                .then(res => setSearchedUsers(res.data))
                .catch(error => console.log(error.message))
        }
        else{
            setSearchedUsers([])
        }
    }, [stringSearch])

    return (
        <div className="search-users-container">
            <div className="header-search-users-container">
                <input type="text" placeholder="Pesquisar usuários" value={stringSearch} onChange={(e) => setStringSearch(e.target.value)} />
                <ion-icon name="search-outline"></ion-icon>
                <button onClick={onClose} ><ion-icon name="close-outline"></ion-icon></button>
            </div>
            <main className="searched-users-container">
                {
                    stringSearch &&
                    <h1>Resultados para "{stringSearch}"</h1>
                }
                <div className="searched-users">
                    {
                        searchedUsers && 
                        searchedUsers.length > 0 ?
                        searchedUsers.map(user => (
                            <div key={user.id} className="user">
                                <div className="user-content">
                                    <img src={user.url_image} alt={user.name} />
                                    <div className="info-user">
                                        <h2>{user.name}</h2>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                                {
                                    soliciteds.includes(user.id) ?
                                    <button>
                                        Solicitação Enviada
                                    </button> : 
                                    <button 
                                        onClick={() => handleSolicitation(user.id)}>
                                        Enviar Solicitação
                                    </button>  
                                }
                            </div>
                        )) :
                        stringSearch ?
                        <div className="nothing-container">
                            <img src={noUsersImage} alt="Nenhum usuário encontrado" />
                            <h1>Nenhum resultado encontrado!</h1>
                        </div> : null
                    }
                </div>
            </main>     
        </div>
    )
}

export default SearchUsers