import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'
import { log } from '.'

@Middleware({ type: 'after' })
export default class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: () => any) {
        log.error(error)

        if (error.httpCode) {
            response.status(error.httpCode)
        }
        response.send({ error: error.message })
        next()
    }
}
