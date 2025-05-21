// This module handles the database operations related to game history.
// Import the database connection
const pool = require('../database/dataBase');

// Create a function to add a new game to the database history
async function addGameToHistory(roomName, conversation) {
    // Create the SQL query to insert the game into the history table
    const query = `INSERT INTO history (room_name, conversation) VALUES ($1, $2)`;
    const values = [roomName, JSON.stringify(conversation)];
    
    // Execute the query with the provided parameters
    await pool.query(query, values);
}

// Create a function to initialize the database
async function initializeDatabase() {
    try {
        // Create the users table if it doesn't exists
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `;
        await pool.query(createTableQuery);

        // Create the history table if it doesn't exists
        const createHistoryTableQuery = `
            CREATE TABLE IF NOT EXISTS history (
                id SERIAL PRIMARY KEY,
                room_name VARCHAR(50) NOT NULL,
                conversation TEXT NOT NULL
            );
        `;
        await pool.query(createHistoryTableQuery);
    
        console.log("Database initialized successfully");
    }
    catch (error) {
        console.error("Error initializing database:", error);
    }

}

module.exports = { addGameToHistory, initializeDatabase };