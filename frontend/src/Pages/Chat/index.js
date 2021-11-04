import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/context'
import { Link, useHistory } from 'react-router-dom'
import socket from 'socket.io-client'

import FriendsList from '../../Components/FriendsList'
import SolicitationsList from '../../Components/SolicitationsList'

import ImageUser from '../../assets/default-user-image.png'
import './style.css'

const Chat = () => {

    const history = useHistory()

    const { user, darkTheme, setDarkTheme, userSelected, viewingChat, setViewingChat, viewingSolicitations, setViewingSolicitations } = useContext(Context)
    const [message, setMessage] = useState('')

    function handleLogout() {
        localStorage.removeItem('chat_user')
        localStorage.removeItem('chat_token')
        history.push('/login')
    }

    function handleMessage() {
        console.log(userSelected)

        const messageObj = {
            socket_id: userSelected.friend_socket_id,
            from: user.id,
            to: userSelected.friend_id,
            message
        }

        console.log(messageObj)
    }

    function handleTheme() {
        setDarkTheme(!darkTheme)
    }

    useEffect(() => {
        const chat = document.querySelector('.chat')
        if(chat)
            chat.scrollTop = chat.scrollHeight

        const io = socket('http://localhost:3001')

        io.on('connect', () => {
            io.emit('receive_data', user)
        })
    }, [viewingChat])

    return (
        <div className={`container ${darkTheme === false ? 'light' : 'dark'}`}>
            <div className={`chat-container ${darkTheme === false ? 'light-secondary' : 'dark-secondary'}`}>
                <div className="left-container">
                    <div className="my-profile">
                        <div className="profile">
                            <img src={ImageUser} alt="user" />
                            <div>
                                <h2>{user.name}</h2>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                    <div className="menu">
                        <div className="item-menu" onClick={() => setViewingChat(false)} >
                            <ion-icon name="home"></ion-icon>
                            <h3>Início</h3>
                        </div>
                        <Link to="/add-friends" className="item-menu">
                            <ion-icon name="person-add"></ion-icon>
                            <h3>Adicionar amigos</h3>
                        </Link>
                    </div>
                    {viewingSolicitations === false ? <FriendsList /> : <SolicitationsList />}
                    <div className="menu-bottom">
                        <button className="btn-logout" onClick={handleLogout}>
                            <ion-icon name="log-out-outline"></ion-icon>
                        </button>
                        <button className="btn-friends-solicitations" onClick={() => setViewingSolicitations(!viewingSolicitations)}>
                            <ion-icon name="people-circle-outline"></ion-icon>
                            <div className="quantity-solicitations">
                                <p>1</p>
                            </div>
                        </button>
                        <button className="btn-theme" onClick={handleTheme}>
                            {darkTheme ? <ion-icon name="sunny"></ion-icon> : <ion-icon name="moon"></ion-icon>}
                        </button>
                    </div>
                </div>
                <div className="right-container">
                    {
                        viewingChat &&
                        <div className="right-container-content" >
                            <div className="header-friend-chat">
                                <div className="info-friend">
                                    <img src={ImageUser} alt="user" />
                                    <div>
                                        <h2>{userSelected.friend_name}</h2>
                                        <p>{userSelected.friend_email}</p>
                                    </div>
                                </div>
                                <div className="close" onClick={() => setViewingChat(false)}>
                                    <ion-icon name="close-outline"></ion-icon>
                                </div>
                            </div>
                            <div className={`chat ${darkTheme === false ? 'light-terciary' : 'dark-terciary'}`}>
                                <div className="message">
                                    <p className="content">Oi</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message my">
                                    <p className="content">Oi</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message">
                                    <p className="content">Tudo bem cria?</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message my">
                                    <p className="content">To sim mano, e você?</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message">
                                    <p className="content">To dboa</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message">
                                    <p className="content">fazendo oq meu bom?</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message my">
                                    <p className="content">
                                        DOKJASDJASIODHASDOIASGDIOAHSDASDOKJASDJASIODHASDOIASGDIOAHSDA
                                        SDOKJASDJASIODHASDOIASGDIOAHSDASDOKJASDJASIODHASDOIASGDIOAHSDASDOKJASD
                                        JASIODHASDOIASGDIOAHSDASDOKJASDJASIODHASDOIASGDIOAHSDAS
                                    </p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message">
                                    <p className="content">??????????????????</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message">
                                    <p className="content">Nerdola</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message my">
                                    <p className="content">Teu pai aquele corno fudido</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                                <div className="message my">
                                    <p className="content">😊</p>
                                    <p className="date">21/03/2021 às 17:10</p>
                                </div>
                            </div>
                            <div className="send-message">
                                <input placeholder={`Conversar com ${userSelected.friend_name}`} type="text" onChange={(e) => setMessage(e.target.value)} />
                                <button onClick={handleMessage} >
                                    <ion-icon name="send"></ion-icon>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat