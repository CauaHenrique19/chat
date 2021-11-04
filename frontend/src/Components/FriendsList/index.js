import React, { useContext, useState } from 'react'
import { Context } from '../../context/context'

import ImageUser from '../../assets/default-user-image.png'
import './style.css'

const FriendsList = () => {

    const { friends, setUserSelected, setViewingChat } = useContext(Context)
    const [viewingInputSearchFriends, setViewingInputSearchFriends] = useState(false)

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
                        <img src={ImageUser} alt="user" />
                        <div>
                            <h2>{friend.friend_name}</h2>
                            <p>{friend.friend_email}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default FriendsList