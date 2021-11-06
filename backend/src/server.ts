import { app } from './app'
import http from 'http'
import { startIo } from './socket'

const server = http.createServer(app)

const io = startIo(server)

server.listen(3001, () => console.log('[BACKEND] Rodando...'))

export { server, io }