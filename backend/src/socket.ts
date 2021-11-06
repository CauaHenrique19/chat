import { Server , Socket } from 'socket.io'
import { Server as httpServer } from 'http'

const startIo = (server: httpServer) => {
    const io = new Server(server, { cors: { origin: '*' } })

    io.on('connection', (socket: Socket) => {
        socket.on('receive_data', data => {
            console.log(`Usuário conectado ${socket.id} : ${data.email}`)
            socket.join(`${data.id}`)
        })
    
        socket.on('received_message', data => {
            io.to(`${data.to}`).emit("message", data);
        })
    })

    return io
}

export { startIo }