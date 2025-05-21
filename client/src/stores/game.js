// This file contains Svelte stores for managing the state of a game application.

// Import the writable function from Svelte's store module
import { writable } from 'svelte/store';

// This store holds the nickname of the player
export const nickname = writable('');

// This store holds the current theme of the game
export const currentTheme = writable('');

// This store holds the players in the game
export const players = writable([]);

// This store holds the current player
export const turn = writable('');

// This store is used to know if it's the bot's turn
export const isBotTurn = writable(false);

// This store holds the phase of the game
export const phase = writable('');

// This store holds the messages in the game
export const messages = writable([]);

// This store is used to know if the player has already voted
export const hasAlreadyVoted = writable(false);

// This store holds the dead players in the game
export const deadPlayers = writable([]);

// This store holds the winner of the game
export const winner = writable('');