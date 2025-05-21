// This file contains Svelte stores for managing the state of a room in a game application.

// Import the writable function from Svelte's store module
import { writable } from 'svelte/store';

// This store holds the current room the user is in
export const currentRoom = writable(null);

// This store holds the room state
export const roomState = writable(null);

// This store holds the number of players in the room
export const numPlayers = writable(0);

// This store holds the number of bots in the room
export const numBots = writable(0);

// This store holds the maximum number of players allowed in the room
export const maxPlayers = writable(0);

// This store holds the messages in the room
export const conversation = writable([]);

// This store holds the users in the room
export const users = writable([]);