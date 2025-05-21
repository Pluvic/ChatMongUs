// This file is the entry point of the server.

// Import libraries and modules
const config = require('./config.js');

const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');

const loginRoutes = require('./routes/authentification');
const gamesRoutes = require('./routes/game');
const databaseRoutes = require('./routes/databaseGame');
const websocketSetup = require('./routes/sockets');
const { preloadModel } = require('./modules/chatBot');
const { initializeDatabase } = require('./modules/databaseGame');


// Create the express app
const app = express();
const server = http.createServer(app);

// Set the constants
const PORT = 3000;

// Setup the middlewares
app.use(express.json());
app.use(cors({
    origin: config.BACKEND_URL + ':5173',
    credentials: true,
    secure: false
}));
app.use(cookieParser());
app.use('/', loginRoutes);
app.use('/', gamesRoutes);
app.use('/', databaseRoutes);

// Setup the websocket
websocketSetup(server);

// Preload ollama model
preloadModel();

// Initialize the database
initializeDatabase();

// Server listenning
server.listen(PORT, () => {
    console.log(`Server listenning at port ${PORT}`);
});