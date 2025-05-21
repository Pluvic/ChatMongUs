// This file contains the routes for the authentication of the users
// It contains the routes to register, login, and get the user information

// Import libraries
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const pool  = require('../database/dataBase');
const { hash, compare } = require('@uswriting/bcrypt');

// Middleware to verify if the user is connected
const sessions = {};

// Create a route to register a user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = hash(password, 10);

        // Make a query to add the user to the database
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
        const values = [username, hashedPassword];

        const result = await pool.query(query, values);

        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });

    // Handle errors
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create a route to authenticate a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Make a query to get the user from the database
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];
        const result = await pool.query(query, values);

        // Check if the user exists
        if (result.rows.length === 0) {
            console.log("User not found");
            return res.status(400).json({ error: "User not found" });
        }

        const user = result.rows[0];

        // Verify the password
        const isPasswordValid = compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Save the user in the session
        const token = uuidv4();
        sessions[token] = user;
        res.cookie('token', token, { httpOnly: true });

        res.status(200).send({ message: "User authenticated successfully" });

    // Handle errors
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Create a route to get the user information
router.get('/auth' , (req, res) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.token;

        // Verify if the user is authenticated
        if (token && sessions[token]) {
            return res.json(sessions[token] );
        }
        return res.status(401).json({ error: "User not authenticated" });
    }
    catch (error) {
        return res.status(401).json({ error: "User not authenticated" });
    }
});

// Log function
router.get('/log', (req, res) => {
    // Display the users
    for (let user = 0; user < users.length; user++) {
        console.log(users[user]);
    }

    // Display the sessions
    for (const session in sessions) {
        console.log(sessions[session]);
    }

    res.send("Check the logs");
});

// Export the router
module.exports = router;