// This file contains functions to navigate between different pages in the app.

// Import the currentPage store from the store module
import { currentPage } from "../stores/store";

// Navigate to the home page
export function back() {
    currentPage.set("home");
    localStorage.setItem("lastPage", "home");
}

// Navigate to the login page
export function login() {
    currentPage.set("login");
    localStorage.setItem("lastPage", "login");
}

// Navigate to the register page
export function register() {
    currentPage.set("register");
    localStorage.setItem("lastPage", "register");
}

// Navigate to the create game page
export function createGame() {
    currentPage.set("createGame");
    localStorage.setItem("lastPage", "createGame");
}

// Navigate to the join game page
export function joinGame() {
    currentPage.set("joinGame");
    localStorage.setItem("lastPage", "joinGame");
}

// Navigate to the game page
export function game() {
    currentPage.set("game");
    localStorage.setItem("lastPage", "game");
}

// Navigate to the history page
export function history() {
    currentPage.set("history");
    localStorage.setItem("lastPage", "history");
}

// Navigate to the rules page
export function rules() {
    currentPage.set("rules");
    localStorage.setItem("lastPage", "rules");
}