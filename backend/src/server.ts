import { app } from './app'
import http from 'http'
import { io } from './socket'

const server = http.createServer(app)

io.listen(3001)
console.log('[BACKEND] Rodando...')
export { server }