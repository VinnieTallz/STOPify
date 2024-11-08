import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import showRequests from './showRequests.js'
import BusStopController from './transitStops/BusStopController.js'


dotenv.config();  // Load environment variables from .env file

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors());

app.use('/api/busStops', BusStopController)

app.use(express.static('../public_html'))
app.use(showRequests)

// Start Server
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

server.on('close',() => {
    console.log('Closing mongo connection')
    disconnectDb()
})


