// This file contains Svelte stores for managing the state of a game application, including user authentication and game data retrieval.

// Import the writable function from Svelte's store module
import { writable } from 'svelte/store';
import config from '../lib/config';

// Create a writable store to hold the current page
export const currentPage = writable("home");

// Create a writable store to hold the current user
export const isConnected = writable(false);
export const userName = writable(null);

// Create a function to see whether the user is connected or not
export async function checkAuthentification() {
    const response = await fetch(config.FRONT_END_URL + ':3000/auth', {
        method: 'GET',
        credentials: 'include'
    });

    // Logs
    console.log(response);

    // User is connected
    if (response.status === 200) {
        // Gather the data from the response
        const data = await response.json();
        console.log(data);

        // Update the store
        isConnected.set(true);
        userName.set(data.username);

        return true;
    }
    
    // User is not connected
    else {
        // Update the store
        isConnected.set(false);
        userName.set(null);

        return false;
    }
}

// Create a function to get the games from the server
export async function getGames() {
    const response = await fetch(config.FRONT_END_URL + ':3000/rooms', {
        method: 'GET'}
    );
    let games = await response.json();

    return games;
}

// Create a function to get the game history from the server
export async function getHistory() {
    const response = await fetch(config.FRONT_END_URL + ':3000/history', {
        method: 'GET'}
    );
    let history = await response.json();

    return history;
}