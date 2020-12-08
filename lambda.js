import Logger from '@workgrid/logger'
const log = new Logger({ file: __filename })

// import serverless from 'serverless-http'
import app from './app'

const server = serverless(app, {
    request: (request, event, context) => {
        return merge(request, { apiGateway: { event, context } })
    }
})

export const handler = lambda(async (event, context) => {
    log.trace('Entering handler')
    log.trace('Event: %o', event)

    return server(event, context)
})
