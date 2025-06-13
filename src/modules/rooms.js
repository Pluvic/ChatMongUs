// This file will store all the rooms data and function

// Import the databaseGame module to store the history of the games and the function to generate a bot message
const { addGameToHistory } = require("../modules/databaseGame");
const { generateBotMessage } = require("./chatBot");

// Database of all the rooms
let rooms = [{ roomName: "CSLabs", roomState : "lobby", numPlayers: 1, maxPlayers: 7, numBots: 0, players : [{id : "aaaa", userID : "10", userName : "Jean"}], conversation : [] },
{ roomName: "CercleInfo", roomState : "lobby", numPlayers: 1, maxPlayers: 5, numBots: 0, players : [{id : "aaaa", userID : "10", userName : "Jean" }], conversation : [] },
{ roomName: "CSEKip", roomState : "lobby", numPlayers: 1, maxPlayers: 4, numBots: 0, players : [{id : "aaaa", userID : "10", userName : "Jean" }], conversation : [] },
{ roomName: "VadimAppelleDimitri", roomState : "lobby", numPlayers: 1, maxPlayers: 4, numBots: 0, players : [{id : "aaaa", userID : "10", userName : "Jean" }], conversation : [] },];

// Database of all the games in progress
let games = [];

// List of all the different subjects
let subject = ["BoardGames", "VideoGames", "CardGames", "Sports", "Movies", "Music", "Books", "TVShows", "Food", "Travel", "Animals", "History", "Science", "Art", "Geography", "Math", "Literature", "Politics", "Fashion", "Technology", "Cars", "Plants", "Space", "Mythology", "Religion", "Language", "Culture", "Health", "Fitness", "MentalHealth", "Relationships", "Education", "Work", "Money", "Hobbies", "SocialMedia", "News", "Weather", "ClimateChange", "Sustainability", "HumanRights", "Equality", "Justice", "Peace", "War", "Violence", "Crime", "Corruption"];
let subjectFR = ["Informatique", "Université", "Chansons", "Films", "Livres", "Jeu de société", "Géographie", "Jeux vidéo", "Sports", "Sciences", "Mathématiques"];
// List of all the different nicknames
let nickNames = ["Victor", "Ugho", "Louca", "Antoine", "Noah", "Thomas", "Mathieu", "Mathis", "Célestin"];
// List of random messages use when a timeout occurs for a player
let message = ["Hello", "Hi", "How are you?", "What's up?", "Good morning", "Good evening", "Good night", "Good afternoon", "Good day", "Good bye", "See you", "Bye", "Good luck", "Take care", "Cheers", "Congratulations", "Thank you", "Sorry", "Please", "Excuse me", "I love you", "I miss you", "I need you", "I want you", "I like you", "I hate you", "I'm hungry", "I'm thirsty", "I'm tired", "I'm bored", "I'm sick", "I'm cold", "I'm hot", "I'm happy", "I'm sad", "I'm angry", "I'm scared", "I'm confused", "I'm lost", "I'm lonely", "I'm busy", "I'm free", "I'm ready", "I'm here", "I'm there", "I'm everywhere", "I'm nowhere", "I'm right", "I'm wrong", "I'm good", "I'm bad", "I'm beautiful", "I'm ugly", "I'm rich", "I'm poor", "I'm smart", "I'm stupid", "I'm funny", "I'm serious", "I'm crazy", "I'm normal", "I'm unique", "I'm special", "I'm different", "I'm the same", "I'm the best", "I'm the worst", "I'm the first", "I'm the last", "I'm the only one", "I'm the chosen one", "I'm the hero", "I'm the villain", "I'm the king", "I'm the queen", "I'm the prince", "I'm the princess", "I'm the president", "I'm the leader", "I'm the boss", "I'm the master"];
let messageFR = ["Bonjour", "Salut", "Comment ça va ?", "Quoi de neuf ?", "Bonjour", "Bonsoir", "Bonne nuit", "Bon après-midi", "Bonne journée", "Au revoir", "À bientôt", "Bye", "Bonne chance", "Prends soin de toi", "Santé", "Félicitations", "Merci", "Désolé", "S'il te plaît", "Excuse-moi", "Je t'aime", "Tu me manques", "J'ai besoin de toi", "Je te veux", "Je t'aime bien", "Je te déteste", "J'ai faim", "J'ai soif", "Je suis fatigué", "Je m'ennuie", "Je suis malade", "J'ai froid", "J'ai chaud", "Je suis heureux", "Je suis triste", "Je suis en colère", "J'ai peur", "Je suis confus", "Je suis perdu", "Je me sens seul", "Je suis occupé", "Je suis libre", "Je suis prêt", "Je suis ici", "Je suis là-bas", "Je suis partout", "Je ne suis nulle part", "J'ai raison", "J'ai tort", "Je vais bien", "Ça va mal", "Tu es beau/belle", "Tu es moche", "Tu es riche"];


// The following functions will be used to manage the rooms

// function to add a room
const addRoom = (roomName, maxPlayers, numBots) => {
    const room = { roomName, roomState : "lobby", numPlayers:0, maxPlayers, numBots, players: [], conversation : [] };
    rooms.push(room);
    return room;
}

// function to remove a room
const removeRoom = (roomName) => {
    const index = rooms.findIndex(room => room.roomName === roomName);
    if (index !== -1) {
        return rooms.splice(index, 1)[0];
    }
}

// function to get all the rooms
const getRooms = () => {
    return rooms;
}

// function to get all the information from a specific room
const getRoomInfo = (roomName) => {

    // Find the room where the player is
    const index = rooms.findIndex(room => room.roomName === roomName);
    if (index !== -1) {
        return rooms[index];
    }
}

// function to add a player to a room
const addPlayer = (socketID, roomName, userID, userName) => {

    // Find the room where the player is
    const index = rooms.findIndex(room => room.roomName === roomName);
    if (index !== -1) {
        rooms[index].numPlayers++;
        rooms[index].players.push({ id: socketID, userID, userName });
        console.log(rooms[index].players);
    }
}

// function to remove a player from a room
const removePlayer = (socketID) => {

    // Find the room where the player is
    const index = rooms.findIndex(room => room.players.some(player => player.id === socketID));
    if (index !== -1) {

        // Find the player in the room
        const playerIndex = rooms[index].players.findIndex(player => player.id === socketID);
        if (playerIndex !== -1) {
            rooms[index].numPlayers--;
            rooms[index].players.splice(playerIndex, 1)[0];
            return true;
        }
    }
    return false;
}

// function to get all the users in a room
const getUsers = (roomName) => {
    const index = rooms.findIndex(room => room.roomName === roomName);
    console.log(roomName);
    if (index !== -1) {
        return rooms[index].players;
    }
}

// function to add a bot to a room
const addBot = (roomName) => {
    const index = rooms.findIndex(room => room.roomName === roomName);
    if (index !== -1) {
        rooms[index].numBots++;
    }
}

// function to remove a bot from a room
const removeBot = (roomName) => {
    const index = rooms.findIndex(room => room.roomName === roomName);
    if (index !== -1) {
        rooms[index].numBots--;
    }
}

// function to add a message to a room
const addMessage = (roomName, message, userName) => {
    // Find the room where the player is
    const index = rooms.findIndex(room => room.roomName === roomName);
    if (index !== -1) {
        // Add the message to the conversation
        rooms[index].conversation.push({text : message, sender : userName});
    }
    return rooms[index].conversation;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


// function to start a game in a room
const startGame = (roomName, language) => {
    const index = rooms.findIndex(room => room.roomName === roomName);
    if (index !== -1) {
        
        // Create a list of players for the game
        let playersGame = [];

        // Select the room first theme
        if (language === 'fr') {
            currentTheme = subjectFR[Math.floor(Math.random() * subjectFR.length)];
        }
        else {
            currentTheme = subject[Math.floor(Math.random() * subject.length)];
        }

        // Get the players of the room
        let players = rooms[index].players;

        // Shuffle the order of the players
        players = shuffleArray(players);

        let randomNumber = Math.floor(Math.random() * nickNames.length);

        // Select a random nickname for every player
        for (let i = 0; i < players.length; i++) {
            playersGame.push({ userID : players[i].userID, nickname : nickNames[(randomNumber + i) % nickNames.length] });
        }

        // Add the bots to the game
        for (let i = 0; i < rooms[index].numBots; i++) {
            playersGame.push({userID: "bot" + i, nickname: nickNames[(randomNumber + players.length + i) % nickNames.length]});
        }

        // Select a random player to start the game
        let turn = playersGame[Math.floor(Math.random() * playersGame.length)].nickname;
        // Verify if the player is a bot
        let player = playersGame.find(player => player.nickname === turn);
        let isBotTurn = false;
        if (player.userID.includes("bot")) {
            isBotTurn = true;
        }

        // Create the game object
        let game = { roomName, currentTheme, playersGame, humansLeft : players.length, turn, isBotTurn, messagesLeft: playersGame.length, phase : "messaging", messages : [], votes : [], deadPlayers : [], winner : "", language };
        
        // Change the state of the room to game
        rooms[index].roomState = "game";
        
        // Add the game to the list of games
        games.push(game);

        return game;
    }
}

// The following functions will be used to manage the games

// function to get the information of a game
const getGameInfo = (roomName) => {
    // Find the game where the player is
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {
        return games[index];
    }
    return null;
}

// function to add a message to a game
const addMessageGame = (roomName, message, userName) => {
    // Find the game where the player is
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {

        // Add the message to the conversation
        games[index].messages.push({text : message, sender : userName, isBot : false});
        updateGame(roomName);
    }
}

// function to generate a message for the bot and add it to the game
const botMessage = (roomName) => {
    // Find the game where the bot is
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {

        let messagesToSend = games[index].playersGame.length - games[index].messagesLeft;
        // Generate a message for the bot and return the Promise
        return generateBotMessage(games[index].currentTheme, games[index].messages.slice(-messagesToSend), games[index].language)
            .then(response => {
                games[index].messages.push({ text: response, sender: games[index].turn, isBot: true });
                updateGame(roomName);
            })
            .catch(error => {
                console.error("Error generating bot message:", error);
            });
    }
    
    // If room is not found, return a resolved Promise to avoid hanging calls
    return Promise.resolve();
};

// function to vote for a player
const voteForPlayer = (roomName, vote, userName) => {
    // Find the game where the player is
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {
        // Add the vote to the votes array
        games[index].votes.push({voter : userName, vote});
    }
}

// function to pass a vote
const passVote = (roomName, userName) => {
    // Find the game where the player is
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {

        // Add the pass to the votes array
        games[index].votes.push({voter : userName, vote : "pass"});
    }
}

// function to handle a timeout
const handleTimeout = (roomName) => {
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {
        // Get the phase to see whether it's a vote or a message timeout

        // If the phase is messaging, add a message to the game
        if (games[index].phase === "messaging") {
            // Select a random message from the list of messages
            let messageToSend = games[index].language === 'fr' ? messageFR : message;
            games[index].messages.push({text : messageToSend[Math.floor(Math.random() * messageToSend.length)], sender : games[index].turn});
            updateGame(roomName);
        }

        // If the phase is voting, add a pass to the votes array for everyone that didn't vote yet
        else if (games[index].phase === "vote") {

            // Add a pass to the votes array for everyone that didn't vote yet
            let players = games[index].playersGame;
            for (let i = 0; i < players.length; i++) {
                if (!games[index].votes.some(vote => vote.voter === players[i].nickname) && !players[i].userID.includes("bot")) {
                    games[index].votes.push({voter : players[i].nickname, vote : "pass"});
                }
            }

            games[index].phase = "results";
            handleVote(roomName);
        }
    }
}

// function to handle all votes
const handleVote = (roomName) => {
    // Find the game where the player is
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {

        // Select vote one by one
        for (let i = 0; i < games[index].votes.length; i++) {

            // If the vote is a pass, skip it and if it's not, find the player that was voted
            if (games[index].votes[i].vote !== "pass") {
                let player = games[index].playersGame.find(player => player.nickname === games[index].votes[i].vote);
                
                // If the player is a human, kill him however if he is a bot, kill the voter
                if (!player.userID.includes("bot")) {
                    // Verify if the player is already dead
                    if (games[index].deadPlayers.includes(player.nickname)) {
                        continue; // Skip if the player is already dead
                    }

                    games[index].deadPlayers.push(player.nickname);
                    games[index].humansLeft--;
                }

                // The player is a bot, kill the voter
                else {
                    // Find the player that voted
                    let voter = games[index].playersGame.find(player => player.nickname === games[index].votes[i].voter);
                    
                    // Verify if the voter is already dead
                    if (games[index].deadPlayers.includes(voter.nickname)) {
                        continue; // Skip if the voter is already dead
                    }

                    games[index].deadPlayers.push(voter.nickname);
                    games[index].humansLeft--;
                }
            }
        }

        // Remove the dead players from the game
        games[index].playersGame = games[index].playersGame.filter(player => !games[index].deadPlayers.includes(player.nickname));
    }
}

// function to update the game after a message is added
const updateGame = (roomName) => {

    // Find the game where the player is
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {
        // Check if the game is still in the messaging phase
        if (games[index].messagesLeft === 1) {
            // Change the phase to vote
            games[index].messagesLeft = games[index].playersGame.length;
            games[index].phase = "vote";
        }

        // Adapt for the next round
        else {
            // Decrease the number of messages left
            games[index].messagesLeft--;

            // Change the turn
            let players = games[index].playersGame;
            let currentTurn = games[index].turn;
            let currentIndex = players.findIndex(player => player.nickname === currentTurn);
            let nextIndex = (currentIndex + 1) % players.length;
            games[index].turn = players[nextIndex].nickname
            games[index].isBotTurn = false;

            // Verify if the next player is a bot
            if (players[nextIndex].userID.includes("bot")) {
                games[index].isBotTurn = true;
            }
        }
    }
}

// function to go to the next round or finish the game if there is only one human left
const nextRound = (roomName) => {
    // Find the game where the player is
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {
        // Verify if the game is over
        if (games[index].humansLeft < 2) {
            games[index].phase = "end";
            endGame(roomName);
        }
        else {
            // Reset everything for the next round
            games[index].votes = [];
            games[index].phase = "messaging";
            games[index].deadPlayers = [];

            if (games[index].language === 'fr') {
                games[index].currentTheme = subjectFR[Math.floor(Math.random() * subjectFR.length)];
            }
            else {
                games[index].currentTheme = subject[Math.floor(Math.random() * subject.length)];
            }
            games[index].turn = games[index].playersGame[Math.floor(Math.random() * games[index].playersGame.length)].nickname;
            games[index].isBotTurn = false;
            let nextIndex = games[index].playersGame.findIndex(player => player.nickname === games[index].turn);
            if (games[index].playersGame[nextIndex].userID.includes("bot")) {
                games[index].isBotTurn = true;
            }
            games[index].messagesLeft = games[index].playersGame.length;
        }
    }
}

// function to end the game and add it to the history
const endGame = (roomName) => {
    // Find the game where the player is
    const index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {
        
        // If there is only one human left, the game is over and the winner is the last human
        if (games[index].humansLeft === 1) {
            let winner = games[index].playersGame.find(player => !games[index].deadPlayers.includes(player.nickname));
            games[index].winner = winner.nickname;
        }

        // If there is no human left, the game is over and the winner is the bots
        else {
            games[index].winner = "bots";
        }

        // Add the game to the history
        addGameToHistory(games[index].roomName, games[index].messages);
    }
}


// function to delete a game
const deleteGame = (roomName) => {
    let index = games.findIndex(game => game.roomName === roomName);
    if (index !== -1) {
        games.splice(index, 1);

        index = rooms.findIndex(room => room.roomName === roomName);
        if (index !== -1) {
            rooms[index].roomState = "lobby";
        }
    }
}

// Function to reset the rooms database (For testing purposes)
const resetRooms = () => {
    rooms = [];
}

// Export all the functions to use them in the socket.js file
module.exports = { addRoom, removeRoom, getRooms, addPlayer, removePlayer, getUsers, getRoomInfo, addBot, removeBot, addMessage, startGame, getGameInfo, addMessageGame, botMessage, voteForPlayer, passVote, handleTimeout, nextRound, deleteGame, resetRooms };