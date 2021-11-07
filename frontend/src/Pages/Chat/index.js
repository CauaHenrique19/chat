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

    const { friends, setFriends, lastMessages, setLastMessages, user, darkTheme, setDarkTheme } = useContext(Context)

    const [messagesOfConversations, setMessagesOfConversations] = useState([])
    const [message, setMessage] = useState('')

    const [conversationSelected, setConversationSelected] = useState({})
    const [userSelected, setUseSelected] = useState({})

    const io = socket('http://localhost:3001')

    async function getFriends() {
        const result = await api.get(`/friendship/friends/${user.id}`)
        setFriends(result.data)
    }

    async function getLastMessages(){
        const result = await api.get(`/conversations/${user.id}`)
        setLastMessages(result.data)
    }

    async function getMessagesOfConversations(){
        const result = await api.get(`/messages/${user.id}/${userSelected.id}`)
        setMessagesOfConversations(result.data)
    }

    useEffect(() => {
        if (friends.length === 0) getFriends()
        if (lastMessages.length === 0) getLastMessages()

        io.on('connect', () => {
            io.emit('receive_data', user)
        })
    
        io.on('message', (data) => {
            console.log(data)
        })
    }, [])

    useEffect(() => {
        if(userSelected.id){
            getMessagesOfConversations()
            const chat = document.querySelector('.chat')
            if (chat) chat.scrollTop = chat.scrollHeight
        }
    }, [userSelected])

    
    useEffect(() => {
        async function readMessages(){
            if(messagesOfConversations.length > 0){
                const pendingMessagesIds = messagesOfConversations
                    .filter(message => message.status === 'pending' && message.from !== user.id)
                    .map(message => message.id)
    
                if(pendingMessagesIds.length > 0){
                    await api.put('/messages', { ids: pendingMessagesIds })
                    conversationSelected.pendingMessages = 0
                    const index = lastMessages.findIndex(lastMessage => lastMessage.id === conversationSelected.id)
                    lastMessages[index] = conversationSelected
                    setLastMessages([...lastMessages])
                }
            }
        }
        readMessages()
    }, [messagesOfConversations])

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
                        lastMessages.map(lastMessage => (
                            <div 
                                key={lastMessage.message.id} 
                                className="last-conversation" 
                                onClick={() => { 
                                    setUseSelected(lastMessage.user)
                                    setConversationSelected(lastMessage)
                                }}
                            >
                                <img src={lastMessage.user.url_image} alt={lastMessage.user.name} />
                                <div className="info-last-conversation">
                                    <div className="header-last-conversation">
                                        <h3 className="last-conversation-user-name">{lastMessage.user.name}</h3>
                                        <p className="last-message">3m atrás</p>
                                    </div>
                                    <div className="content-last-conversation">
                                        <p className="message-preview">
                                            {lastMessage.message.content}...
                                        </p>
                                        {
                                            lastMessage.pendingMessages > 0 &&
                                            <div className="count-messages">
                                                {lastMessage.pendingMessages}
                                            </div>
                                        }
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
                            {
                                messagesOfConversations &&
                                messagesOfConversations.length > 0 && 
                                messagesOfConversations.map(message => (
                                    <div key={message.id} className={message.from === user.id ? "message my last" : "message last"}>
                                        <p className="content">{message.content}</p>
                                        {/* <p className="date">21/03/2021 às 17:10</p> */}
                                    </div>
                                ))
                            }
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