const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })
const cors = require('cors')
const routes = require('./routes')
const knex = require('./database/connection')
const crypto = require('crypto')

app.use(cors())
app.use(express.json())
app.use(routes)

io.on('connection', socket => {
    socket.on('receive_data', data => {
        socket.id = data.id
        console.log(socket)
        console.log(`Usuário conectado ${socket.id}`)
        //console.log(data)
        // try{
        //     knex('users')
        //         .update({ socket_id : data.socket_id })
        //         .where({ id: data.id })
        //         .then(() => console.log(`SocketId do usuário ${data.userId} atualizado`))
        // }
        // catch (error){
        //     console.log(`Ocorreu um erro ao atualizar socket_id do usuário ${error.message}`)
        // }
    })
})

server.listen(3001, () => console.log('[BACKEND] Rodando...'))