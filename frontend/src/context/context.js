import React, { useState, createContext, useEffect } from 'react'
import api from '../services/api'

export const Context = createContext()

const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('chat_user')) || {})
    const [token, setToken] = useState(localStorage.getItem('chat_token') || '')
    const [friends, setFriends] = useState([])
    const [darkTheme, setDarkTheme] = useState(true)
    const [viewingChat, setViewingChat] = useState(false)
    const [userSelected, setUserSelected] = useState({})
    const [viewingSolicitations, setViewingSolicitations] = useState(false)

    useEffect(() => {
        async function getFriends(){
            const result = await api.get(`http://localhost:3001/friendship/friends/${user.id}`)
            setFriends(result.data)
        }
        getFriends()
    }, [user])

    return (
        <Context.Provider value={{
            user, setUser,
            token, setToken,
            friends, setFriends,
            darkTheme, setDarkTheme,
            viewingChat, setViewingChat,
            userSelected, setUserSelected,
            viewingSolicitations, setViewingSolicitations
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider