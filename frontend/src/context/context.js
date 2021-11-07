import React, { useState, createContext } from 'react'

export const Context = createContext()

const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('chat_user')) || {})
    const [token, setToken] = useState(localStorage.getItem('chat_token') || '')
    const [lastMessages, setLastMessages] = useState([])
    const [friends, setFriends] = useState([])
    const [darkTheme, setDarkTheme] = useState(true)

    return (
        <Context.Provider value={{
            user, setUser,
            token, setToken,
            friends, setFriends,
            lastMessages, setLastMessages,
            darkTheme, setDarkTheme,
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider