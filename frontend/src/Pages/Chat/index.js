import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from '../../context/context'
import { useHistory } from 'react-router-dom'
import { Picker, Emoji } from 'emoji-mart'
import { renderToString } from 'react-dom/server'

import socket from 'socket.io-client'
import api from '../../services/api'
import translateEmoji from '../../utils/l18n-emoji'

import ChatImage from '../../assets/Mailbox.png'
import MessageImage from '../../assets/Message.png'
import SearchImage from '../../assets/Magnifier.png'
import SearchUsers from '../SearchUsers'

import 'emoji-mart/css/emoji-mart.css'
import './style.css'

const Chat = () => {

    const history = useHistory()

    const chatRef= useRef()

    const { friends, setFriends, user, darkTheme, setDarkTheme } = useContext(Context)
    const [filteredFriends, setFilteredFriends] = useState([])

    const [receivedMessage, setReceivedMessage] = useState({})
    const [solicitations, setSolicitations] = useState([])

    const [filteredLastMessages, setFilteredLastMessages] = useState([])
    const [lastMessages, setLastMessages] = useState([])

    const [messagesOfConversations, setMessagesOfConversations] = useState([])
    const [answerMessage, setAnswerMessage] = useState({})
    const [messageInput, setMessageInput] = useState('')
    const [message, setMessage] = useState('')

    const [conversationSelected, setConversationSelected] = useState({})
    const [userSelected, setUseSelected] = useState({})
    const [viewSolicitations, setViewSolicitations] = useState(false)
    const [viewEmojiPicker, setViewEmojiPicker] = useState(false)
    const [viewSearchPage, setViewSearchPage] = useState(false)

    useEffect(() => {
        const io = socket('http://localhost:3001', {
            transports: ["websocket", "polling"]
        })
        
        io.on('connect', () => {
            io.emit('receive_data', user)
        })
        
        io.on('message', (message) => {
            setReceivedMessage(message)
        })

        io.on('solicitation_friendship', (solicitation) => {
            solicitations.push(solicitation)
            setSolicitations(solicitations)
        })

        api.get(`/friendship/friends/${user.id}`)
            .then(res => {
                setFilteredFriends(res.data)
                setFriends(res.data)
            })
            .catch(error => console.log(error))

        api.get(`/conversations/${user.id}`)
            .then(res => {
                setFilteredLastMessages(res.data)
                setLastMessages(res.data)
            })
            .catch(error => console.log(error))

        api.get(`/friendship/solicitations/${user.id}`)
            .then(res => setSolicitations(res.data))
            .catch(error => console.log(error))
    }, [])

    async function getMessagesOfConversations(){
        const result = await api.get(`/messages/${user.id}/${userSelected.id}`)
        setMessagesOfConversations(result.data)
    }

    useEffect(() => {
        if(receivedMessage.message && receivedMessage.message.id){
            const conversation = lastMessages.find(lastMessage => receivedMessage.message.from === lastMessage.user.id)

            if(conversation){
                const indexOfConversation = lastMessages.indexOf(conversation)
                conversation.pendingMessages = parseInt(conversation.pendingMessages) + 1
                conversation.message = receivedMessage.message
                lastMessages[indexOfConversation] = conversation
                setLastMessages([...lastMessages])
            }
            else{
                const newConversation = {
                    from: receivedMessage.from,
                    to: user.id,
                    message: receivedMessage.message,
                    user: receivedMessage.user,
                    pendingMessages: 1
                }

                lastMessages.push(newConversation)
                setLastMessages([...lastMessages])
            }
            
            if(conversationSelected.user && conversationSelected.user.id === receivedMessage.message.from){
                if(!messagesOfConversations.includes(receivedMessage.message)){
                    setMessagesOfConversations([...messagesOfConversations, receivedMessage.message])
                }
            }
        }
    }, [receivedMessage])

    useEffect(() => {
        if(userSelected.id){
            getMessagesOfConversations()
        }
    }, [userSelected])
    
    useEffect(() => {
        if(chatRef.current){
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [messagesOfConversations])

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
        history.push('/')
    }

    function handleMessage() {
        const messageToSend = {
            from: user.id,
            to: userSelected.id,
            content: messageInput,
            answer_message_id: answerMessage.id
        }

        if(messageToSend.content){
            api.post('/message', messageToSend)
                .then(res => {
                    setMessagesOfConversations([...messagesOfConversations, res.data.message])
                    conversationSelected.message = res.data.message
                    setConversationSelected(conversationSelected)
                    setMessage('')
                    setMessageInput('')
                    setAnswerMessage({})
                })
                .catch(error => console.log(error))
        }
    }

    function handleAcceptSolicitation(solicitationId){
        api.put('/friendship', { id: solicitationId })
            .then(res => {
                const solicitation = solicitations.find(solicitationF => solicitationF.solicitation.id === solicitationId)
                solicitations.splice(solicitation, 1)
                setSolicitations([...solicitations])
                const friend = solicitation.user
                setFriends([...friends, friend])
            })
            .catch(error => console.log(error.message))
    }

    function handleSearch(searchFunction, arrayToManipulate, setValue){
        const searched = arrayToManipulate.filter(searchFunction)
        setValue(searched)
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
                        <li onClick={() => {
                            setViewSearchPage(!viewSearchPage)
                            setConversationSelected({})
                            setUseSelected({})
                        }} >
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
                            <i class="bi bi-box-arrow-left"></i>
                        </li>
                    </div>
                </ul>
            </aside>
            <div className="last-messages-container">
                <div className="header-last-messages-container">
                    <div className="input-container">
                        <input 
                            type="text" 
                            placeholder="Procure suas conversas" 
                            onChange={
                                (e) => handleSearch(
                                    conversation => conversation.user.name.includes(e.target.value) || conversation.user.email.includes(e.target.value), 
                                    lastMessages,
                                    setFilteredLastMessages
                                )
                            } 
                        />
                        <ion-icon name="search-outline"></ion-icon>
                    </div>
                </div>
                <div className="header-last-messages-content">
                    <h1>Suas conversas</h1>
                </div>
                <div className="last-messages-content">
                    {
                        filteredLastMessages &&
                        filteredLastMessages.length > 0 ?
                        filteredLastMessages.map(lastMessage => (
                            <div 
                                key={lastMessage.message.id} 
                                className="last-conversation" 
                                onClick={() => { 
                                    setViewSearchPage(false)
                                    setUseSelected(lastMessage.user)
                                    setConversationSelected(lastMessage)
                                }}
                            >
                                <img src={lastMessage.user.url_image} alt={lastMessage.user.name} />
                                <div className="info-last-conversation">
                                    <div className="header-last-conversation">
                                        <h3 className="last-conversation-user-name">{lastMessage.user.name}</h3>
                                        <p className="last-message">3m atr??s</p>
                                    </div>
                                    <div className="content-last-conversation">
                                        <p className="message-preview" dangerouslySetInnerHTML={{ __html: lastMessage.message.content }}></p>
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
                            <h2>Voc?? ainda n??o enviou mensagem pra ningu??m!</h2>
                        </div>
                    }
                </div>
            </div>
            { viewSearchPage && <SearchUsers onClose={() => setViewSearchPage(false)} />}
            {
                userSelected.id &&
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
                                    <i class="bi bi-pin-angle"></i>
                                </button>
                                <button>
                                    <i class="bi bi-person-x"></i>
                                </button>
                                <button 
                                    onClick={() => {
                                        setUseSelected({})
                                        setConversationSelected({})
                                    }}
                                >
                                    <ion-icon name="close-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                        <main ref={chatRef} className="chat-messages">
                            {
                                messagesOfConversations &&
                                messagesOfConversations.length > 0 && 
                                messagesOfConversations.map(message => (
                                    <div key={message.id} className={message.from === user.id ? "message my last" : "message last"}>
                                        <img 
                                            src={message.from === user.id ? user.url_image : userSelected.url_image} 
                                            alt={message.from === user.id ? user.name : userSelected.name} 
                                        />
                                        <div className="message-content">
                                            {
                                                message.answer_message_id &&
                                                <div className="answer-content">
                                                    <p dangerouslySetInnerHTML={{ __html: message.answered_message.content }} />
                                                </div>
                                            }
                                            <div className="message-content-wrap">
                                                <div className="content">
                                                    <p className="content-message" dangerouslySetInnerHTML={{ __html: message.content }} />
                                                    <p className="date">{message.created_at_string.substr(message.created_at_string.lastIndexOf(' '), 6)}</p>
                                                </div>
                                                <button onClick={() => setAnswerMessage(message)}>
                                                    {
                                                        message.from === user.id ?
                                                        <ion-icon name="arrow-redo-outline"></ion-icon> :
                                                        <ion-icon name="arrow-undo-outline"></ion-icon>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </main>
                        <div className={answerMessage.id ? "send-message" : "send-message full"}>
                            {
                                answerMessage.id &&
                                <div className="answer-container">
                                    <div className="answer-content">
                                        <ion-icon name="arrow-undo"></ion-icon>
                                        <p dangerouslySetInnerHTML={{ __html: answerMessage.content }}></p>
                                    </div>
                                    <button onClick={() => setAnswerMessage({})}>
                                        <ion-icon name="close-outline"></ion-icon>
                                    </button>
                                </div>
                            }
                            <div className="input-send-message-container">
                                {
                                    viewEmojiPicker &&
                                    <Picker 
                                        theme="dark"
                                        i18n={translateEmoji}
                                        color="#964bff"
                                        onSelect={(emoji) => {
                                            const newMessage = message + emoji.native
                                            const newMessageInput = messageInput + renderToString(
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: Emoji({
                                                            html: true,
                                                            set: "apple",
                                                            emoji: emoji.colons,
                                                            size: 25
                                                        })
                                                    }}
                                                />
                                            )     
                                            setMessageInput(newMessageInput)
                                            setMessage(newMessage)
                                            setViewEmojiPicker(false)
                                        }} 
                                    />
                                }
                                <input 
                                    type="text" 
                                    placeholder="Envie sua mensagem" 
                                    value={message} 
                                    onChange={(e) => {
                                        setMessage(e.target.value)
                                        setMessageInput(e.target.value)
                                    }} 
                                onKeyUp={(e) => e.key === 'Enter' && handleMessage() } />
                                <button onClick={() => setViewEmojiPicker(!viewEmojiPicker)} >
                                    <ion-icon name="happy-outline"></ion-icon>
                                </button>
                                <button onClick={handleMessage}>
                                    <i class="bi bi-send"></i>
                                </button>
                            </div>
                        </div>
                    </div> 
            }
            {
                !userSelected.id && !viewSearchPage &&
                <div className="start-chat-container" >
                    <img src={ChatImage} alt="" />
                    <h1>Bem Vindo! Pronto para conversar?</h1>
                </div>

            }
            <div className="right-container">
                {
                    !viewSolicitations &&
                    <>
                        <div className="header-my-friends">
                            <div className="input-container">
                                <input 
                                    type="text" 
                                    placeholder="Procure seus amigos"
                                    onChange={
                                        (e) => handleSearch(
                                            friend => friend.name.includes(e.target.value) || friend.email.includes(e.target.value), 
                                            friends,
                                            setFilteredFriends
                                        )
                                    }
                                />
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                        </div>
                        <div className="header-friends-content">
                            <h1>Seus amigos</h1>
                        </div>
                        <div className="friends-content">
                            {
                                filteredFriends &&
                                filteredFriends.length > 0 ?
                                filteredFriends.map(friend => (
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
                                    <h2>Adicione algu??m para conversar e mostraremos aqui!</h2>
                                </div>
                            }
                        </div>
                    </>
                }
                {
                    viewSolicitations &&
                    <div className="solicitations-content">
                        <div className="header-solicitations-content">
                            <h1>Suas Solicita????es</h1>
                        </div>
                        <div className="solicitations">
                            {
                                solicitations &&
                                solicitations.length > 0 &&
                                solicitations.map(solicitation => (
                                    <div key={solicitation.solicitation.id} className="solicitation">
                                        <div className="user">
                                            <img src={solicitation.user.url_image} alt={solicitation.user.name} />
                                            <div className="user-info">
                                                <h2>{solicitation.user.name}</h2>
                                                <p>{solicitation.user.email.substring(0, 18)}...</p>
                                            </div>
                                        </div>
                                        <div className="buttons-container">
                                            <button onClick={() => handleAcceptSolicitation(solicitation.solicitation.id)}>
                                                <ion-icon name="checkmark-outline"></ion-icon>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                <div className="menu-my-friends">
                    <button onClick={() => setViewSolicitations(false)} className={`${!viewSolicitations && "selected"}`}>
                        <ion-icon name="people-circle-outline"></ion-icon>
                    </button>
                    <button onClick={() => setViewSolicitations(true)} className={`${viewSolicitations && "selected"}`}>
                        <ion-icon name="person-add-outline"></ion-icon>
                        {
                            solicitations &&
                            solicitations.length > 0 &&
                            <div className="quantity-solicitations">{solicitations.length}</div>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat