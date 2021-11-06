import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/context'

import './style.css'
import api from '../../services/api'

const FriendsList = () => {

    const { user, friends, setFriends } = useContext(Context)
    const [viewingInputSearchFriends, setViewingInputSearchFriends] = useState(false)

    async function getFriends(){
        const result = await api.get(`http://localhost:3001/friendship/friends/${user.id}`)
        setFriends(result.data)
    }
    
    useEffect(() => {
        if(friends.length === 0) getFriends()
    }, [])

    return (
        <div className="friends">
            <div className="header-friends">
                <h1>Amigos</h1>
                <div className="input-container">
                    <input type="text" placeholder="Pesquisar amigos" className={viewingInputSearchFriends ? 'viewing' : ''} />
                    <button onClick={() => setViewingInputSearchFriends(!viewingInputSearchFriends)}>
                        <ion-icon name="search-outline"></ion-icon>
                    </button>
                </div>
            </div>
            {
                friends.length > 0 &&
                friends.map(friend => (
                    <div
                        key={friend.friend_id}
                        className="friend"
                        onClick={() => {
                            setUserSelected(friend)
                            setViewingChat(true)
                        }
                        }>
                        <img src={friend.url_image} alt="user" />
                        <div>
                            <h2>{friend.name}</h2>
                            <p>{friend.email}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default FriendsList