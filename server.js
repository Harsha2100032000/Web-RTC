const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');  // Move this line up

const app = express();
app.use(cors());  // Use CORS middleware here

// Serve static files from the "public" directory
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established.');  // Added for checking WebSocket connections
  
  ws.on('message', (message) => {
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed.');  // Added for checking WebSocket connections
  });
});

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
});

server.listen(8000, () => {
  console.log('Server listening on http://10.56.1.45:8000');
});
