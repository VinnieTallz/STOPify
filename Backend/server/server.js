import express from 'express';
import showRequests from './showRequests.js';
import transitStopController from './transitStops/transitStopController.js'; // Make sure this controller handles the 'nearby' endpoint
import { disconnectDb } from './db.js';
import cors from 'cors';  // Import CORS

const port = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(showRequests);
app.use(express.static('../public_html'));
app.use(express.json());

// Enable CORS for all routes (you can specify more options if needed)
app.use(cors()); // This allows all domains to access the API

// API Routes
app.use('/api/transitStops', transitStopController); // Make sure this includes the '/nearby' endpoint
app.use('/api/transitStops/nearby', transitStopController)

// Start Server
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

// Graceful shutdown handling
server.on('close', () => {
  console.log('Closing mongo connection');
  disconnectDb();
});
