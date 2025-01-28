import { useExpressServer, Action } from 'routing-controllers'
import { UserController, ProductController } from './controller'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import { GlobalErrorHandler, log, getSessionUserId } from './common'

dotenv.config()

process.on('uncaughtException', (reason, p) => {
    log.error(reason, p)
})
process.on('unhandledRejection', (reason, p) => {
    log.error(reason, p)
})

const port = process.env.port
const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

useExpressServer(server, {
    controllers: [UserController, ProductController],
    middlewares: [GlobalErrorHandler],
    defaultErrorHandler: false,
    authorizationChecker: async (action: Action) => {
        // user authorization or registration
        if (['/user', '/auth'].includes(action.request.route?.path) && action.request.method === 'POST') {
            return true
        }
        return !!getSessionUserId(action.request.query?.sessionId)
    },
})

server.listen(port, () => log.info(`The server is running at http://localhost:${port}`))
