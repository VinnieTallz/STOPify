import express from 'express'
import showRequests from './showRequests.js'
// import transitRouteController from './transitRoute/transitRouteController.js'
import transitStopController from './transitStops/transitStopController.js'

import { disconnectDb } from './db.js'

const port = process.env.PORT || 3000
const app = express()

app.use(showRequests)
app.use(express.static('../public_html'))
app.use(express.json())

// app.use('/api/transitRoute', transitRouteController)
app.use('/api/transitStops', transitStopController)

const server = app.listen(port, () => {
    console.log('Server listening on port ' + port)
})

server.on('close',() => {
    console.log('Closing mongo connection')
    disconnectDb()
})
