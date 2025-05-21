// This file contains the routes for the game module

// Import libraries and required modules
const { getRooms, addRoom } = require('../modules/rooms.js');
const router = require('express').Router();

// Create a route to get all the rooms
router.get('/rooms', (req, res) => {
    res.json(getRooms());
});

// Create a route to create a room
router.post('/create-room', (req, res) => {
    const { roomName, maxPlayers, numBots } = req.body;
    const room = addRoom(roomName, maxPlayers, numBots);
    res.json(room);
});

// Export the router
module.exports = router;
