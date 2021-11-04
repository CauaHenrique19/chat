import React from 'react'
//import socket from 'socket.io-client'

import ContextProvider from './context/context'

import Routes from './routes'
import './global.css'

function App() {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  )
}

export default App;
