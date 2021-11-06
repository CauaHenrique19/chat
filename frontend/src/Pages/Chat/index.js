import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/context'
import { Link, useHistory } from 'react-router-dom'

import socket from 'socket.io-client'
import api from '../../services/api'

import ChatImage from '../../assets/Mailbox.png'
import MessageImage from '../../assets/Message.png'
import SearchImage from '../../assets/Magnifier.png'

import './style.css'

const Chat = () => {

    const history = useHistory()

    const { friends, setFriends, user, darkTheme, setDarkTheme } = useContext(Context)

    const [lastMessages, setLastMessages] = useState([])
    const [message, setMessage] = useState('')
    const [userSelected, setUseSelected] = useState({})

    const io = socket('http://localhost:3001')

    async function getFriends() {
        const result = await api.get(`http://localhost:3001/friendship/friends/${user.id}`)
        setFriends(result.data)
    }

    useEffect(() => {
        if (friends.length === 0) getFriends()

        io.on('connect', () => {
            io.emit('receive_data', user)
        })
    
        io.on('message', (data) => {
            console.log(data)
        })

        console.log('aqui')
    }, [])

    useEffect(() => {
        const chat = document.querySelector('.chat')
        if (chat) chat.scrollTop = chat.scrollHeight
    }, [userSelected])

    function handleLogout() {
        localStorage.removeItem('chat_user')
        localStorage.removeItem('chat_token')
        history.push('/login')
    }

    function handleMessage() {
        const messageObj = {
            from: user.id,
            to: userSelected.id,
            message
        }

        io.emit('received_message', messageObj)
        console.log(messageObj)
    }

    function handleTheme() {
        setDarkTheme(!darkTheme)
    }

    return (
        <div className={darkTheme ? "chat-container dark" : "chat-container light"}>
            <aside className="sidebar">
                <div className="header-sidebar"></div>
                <ul>
                    <div className="center">
                        <li className="selected">
                            <ion-icon name="home-outline"></ion-icon>
                        </li>
                        <li>
                            <ion-icon name="search-outline"></ion-icon>
                        </li>
                        <li>
                            <ion-icon name="person-outline"></ion-icon>
                        </li>
                        <li onClick={handleTheme}>
                            <ion-icon name="moon-outline"></ion-icon>
                        </li>
                    </div>
                    <div className="bottom">
                        <li onClick={handleLogout}>
                            <ion-icon name="log-out-outline"></ion-icon>
                        </li>
                    </div>
                </ul>
            </aside>
            <div className="last-messages-container">
                <div className="header-last-messages-container">
                    <div className="input-container">
                        <input type="text" placeholder="Procure suas conversas" />
                        <ion-icon name="search-outline"></ion-icon>
                    </div>
                </div>
                <div className="header-last-messages-content">
                    <h1>Suas conversas</h1>
                </div>
                <div className="last-messages-content">
                    {
                        lastMessages &&
                        lastMessages.length > 0 ?
                        lastMessages.map(friend => (
                            <div className="friend" onClick={() => setUseSelected(friend)}>
                                <img key={friend.id} src={friend.url_image} alt="user" />
                                <div className="info-friend">
                                    <div className="header-friend">
                                        <h3 className="friend-name">{friend.name}</h3>
                                        <p className="last-message">3m atrás</p>
                                    </div>
                                    <div className="content-friend">
                                        <p className="message-preview">
                                            Lorem Ipsum is simply dummy...
                                        </p>
                                        <div className="count-messages">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) :
                        <div className="nothing-container">
                            <img src={MessageImage} alt="Nada Ainda" />
                            <h2>Você ainda não enviou mensagem pra ninguém!</h2>
                        </div>
                    }
                </div>
            </div>
            {
                userSelected.id ?
                    <div className="chat-content">
                        <div className="header-chat-content">
                            <div className="user-selected-info">
                                <img src={userSelected.url_image} alt={userSelected.name} />
                                <div>
                                    <h1>{userSelected.name}</h1>
                                    <p>Amigos desde 16/05/2021</p>
                                </div>
                            </div>
                            <div className="buttons-container">
                                <button>
                                    <ion-icon name="pin-outline"></ion-icon>
                                </button>
                                <button>
                                    <ion-icon name="person-remove-outline"></ion-icon>
                                </button>
                                <button onClick={() => setUseSelected({})}>
                                    <ion-icon name="close-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                        <main className="chat-messages">
                            <div className="message">
                                <p className="content">Oi</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message my">
                                <p className="content">Oi</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message">
                                <p className="content">Tudo bem cria?</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message my">
                                <p className="content">To sim mano, e você?</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message">
                                <p className="content">To dboa</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message">
                                <p className="content">fazendo oq meu bom?</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message my last">
                                <p className="content">
                                    DOKJASDJASIODHASDOIASGDIOAHSDASDOKJASDJASIODHASDOIASGDIOAHSDA
                                    SDOKJASDJASIODHASDOIASGDIOAHSDASDOKJASDJASIODHASDOIASGDIOAHSDASDOKJASD
                                    JASIODHASDOIASGDIOAHSDASDOKJASDJASIODHASDOIASGDIOAHSDAS
                                </p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message">
                                <p className="content">??????????????????</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message last">
                                <p className="content">Nerdola</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message my">
                                <p className="content">Teu pai aquele corno fudido</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                            <div className="message my last">
                                <p className="content">😊</p>
                                {/* <p className="date">21/03/2021 às 17:10</p> */}
                            </div>
                        </main>
                        <div className="send-message">
                            <input type="text" placeholder="Envie sua mensagem" value={message} onChange={(e) => setMessage(e.target.value)} />
                            <button>
                                <ion-icon name="happy-outline"></ion-icon>
                            </button>
                            <button onClick={handleMessage}>
                                <ion-icon name="send-outline"></ion-icon>
                            </button>
                        </div>
                    </div> :
                    <div className="start-chat-container" >
                        <img src={ChatImage} alt="" />
                        <h1>Bem Vindo! Pronto para conversar?</h1>
                    </div>
            }
            <div className="my-friends">
                <div className="header-my-friends">
                    <div className="input-container">
                        <input type="text" placeholder="Procure seus amigos" />
                        <ion-icon name="search-outline"></ion-icon>
                    </div>
                </div>
                <div className="header-friends-content">
                    <h1>Seus amigos</h1>
                </div>
                <div className="friends-content">
                    {
                        friends &&
                        friends.length > 0 ?
                        friends.map(friend => (
                            <div key={friend.id} className="friend" onClick={() => setUseSelected(friend)}>
                                <img key={friend.id} src={friend.url_image} alt="user" />
                                <div className="info-friend">
                                    <h3 className="friend-name">{friend.name}</h3>
                                    <p>{friend.email}</p>
                                </div>
                            </div>
                        )) :
                        <div className="nothing-container">
                            <img src={SearchImage} alt="Nada Ainda" />
                            <h2>Adicione alguém para conversar e mostraremos aqui!</h2>
                        </div>
                    }
                </div>
                <div className="menu-my-friends">
                    <button className="selected">
                        <ion-icon name="people-circle-outline"></ion-icon>
                    </button>
                    <button>
                        <ion-icon name="person-add-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat