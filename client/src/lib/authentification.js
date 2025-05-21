// All the functions to register and login a user

import { currentPage, isConnected, userName } from "../stores/store";

// Function to register a new user
export async function register(username, password) {

    // Request to the server to register a new user
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, password
        })
    });

    // Get the response from the server
    const data = await response.json();

    // If the response is not ok, display the error message
    if (!response.ok) {
        console.log(data.message);
        
    } else {
        console.log(data.message);
        currentPage.set("login");
    }
}

// Function to login a user
export async function login(username, password) {

    // Request to the server to login a user
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, password
        })
    });

    // Get the response from the server
    const data = await response.json();

    // If the response is not ok, display the error message
    if (!response.ok) {
        console.log(data.message);

    } else {
        console.log(data.message);
        currentPage.set("home");

        isConnected.set(true);
        userName.set(username);
    }
}