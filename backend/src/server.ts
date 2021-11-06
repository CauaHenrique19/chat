import { app } from './app'
import http from 'http'
import { startIo } from './socket'

const server = http.createServer(app)
server.listen(3001, () => console.log('[BACKEND] Rodando...'))
startIo()

export { server }