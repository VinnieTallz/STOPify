import express from 'express'
import showRequests from './showRequests.js'
import TransitRouteController from './transitRoute/TransitRouteController.js'

import { disconnectDb } from './db.js'

const port = process.env.PORT || 3000
const app = express()

app.use(showRequests)
app.use(express.static('../public_html'))
app.use(express.json())

app.use('/api/transitRoute', TransitRouteController)

const server = app.listen(port, () => {
    console.log('Server listening on port ' + port)
})

server.on('close',() => {
    console.log('Closing mongo connection')
    disconnectDb()
})
