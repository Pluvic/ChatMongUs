// This file is responsible for managing the socket connections and events
// It uses the socket.io library to create a socket server and listen for events

// Import the required modules
const config = require('../config.js');
const { Server } = require("socket.io");
const { addPlayer, removePlayer, getUsers, getRoomInfo, addBot, removeBot, addMessage, startGame, getGameInfo, addMessageGame, botMessage, voteForPlayer, passVote, handleTimeout, nextRound, deleteGame } = require('../modules/rooms.js');

// Create the socket server and listen for events and export it to be used in the app.js file
module.exports = (server) => {

    // Create the socket server
    const io = new Server(server, {
        cors: {
            origin: config.BACKEND_URL + ":5173",
            methods: ["GET", "POST"]
        }
    });

    // Listen for connections
    io.on('connection', (socket) => {

        // socket for connecting to the room
        socket.on('joinRoom', (data) => {

            const { roomName, userID, userName } = data;

            // Add the socket to the room
            socket.join(roomName);

            // get the users in the room
            const users = getUsers(roomName);

            // check if the player is already in the room
            let playerIndex = users.findIndex(player => player.userID === userID);

            if (playerIndex !== -1) {
                // Get the existing player
                const existingPlayer = users[playerIndex];
                // Update the socket id
                existingPlayer.id = socket.id;
                // Log
                console.log(userName + ' reconnected to room: ' + roomName);
            }

            else {
                // Add user to the room
                addPlayer(socket.id, roomName, userID, userName);
                
                // Log
                console.log(userName + ' joined room: ' + roomName);
            }

            // Send the room info to the room
            io.to(roomName).emit('roomInfo', getRoomInfo(roomName));
        });

        // socket for sending messages
        socket.on('message', (data) => {

            // Log
            console.log(data.text + ' - ' + data.sender);

            // Add the message to the conversation
            newConversation = addMessage(data.roomName, data.text, data.sender);
            
            // Send the message to the room
            io.to(data.roomName).emit('message', newConversation);
        });

        // socket for sending message ingame
        socket.on('gameMessage', (data) => {

            // Log
            console.log(data.text + ' - ' + data.sender);

            // Add the message to the conversation
            addMessageGame(data.roomName, data.text, data.sender);

            gameInfo = getGameInfo(data.roomName);
            
            // Send the message to the room
            io.to(data.roomName).emit('gameInfo', gameInfo);

            //handle bot turns if there are bots in the game
            if (gameInfo.isBotTurn) {
                (async () => {
                    await handleBotTurns(data.roomName);
                    console.log('Bot turns handled for room:', data.roomName);
                    let gameInfo2 = getGameInfo(data.roomName);
            
                    console.log('Game phase:', gameInfo2.phase);
                    if (gameInfo2.phase == "vote") {
                        console.log('Setting timeout for vote phase in room:', data.roomName);
                        setTimeout(() => {
                            handleTimeout(data.roomName);
                            io.to(data.roomName).emit('gameInfo', getGameInfo(data.roomName));
                    }, 21000);
            }
                })().catch(err => {
                    console.error('Error handling bot turns:', err);
                });
            }

            let gameInfo2 = getGameInfo(data.roomName);

            console.log('Game phase:', gameInfo2.phase);
            if (gameInfo2.phase == "vote") {
                console.log('Setting timeout for vote phase in room:', data.roomName);
                setTimeout(() => {
                    handleTimeout(data.roomName);
                    io.to(data.roomName).emit('gameInfo', getGameInfo(data.roomName));
                }, 16000);
            }
            
        });



        // Socket for adding a bot to the room
        socket.on('addBot', (data) => {
            // Add the bot to the room
            addBot(data.roomName);

            // Log
            console.log('Bot added to room: ' + data.roomName);

            // Send the information to the room
            io.to(data.roomName).emit('roomInfo', getRoomInfo(data.roomName));
        });

        // Socket for removing a bot from the room
        socket.on('removeBot', (data) => {
            // Remove the bot from the room
            removeBot(data.roomName);

            // Log
            console.log('Bot removed from room: ' + data.roomName);

            // Send the information to the room
            io.to(data.roomName).emit('roomInfo', getRoomInfo(data.roomName));
        });

        // Socket for starting the game
        socket.on('startGame', (data) => {
            // Log
            console.log('Game Start in Room ' + data.roomName);

            // Start the game
            let newGame = startGame(data.roomName);

            // Send the information to the room
            io.to(data.roomName).emit('gameInfo', newGame);

            // Handle bot turns if there are bots in the game
            if (newGame.isBotTurn) {
                handleBotTurns(data.roomName).then(() => {
                    console.log('Bot turns handled for room:', data.roomName);
                }).catch(err => {
                    console.error('Error handling bot turns:', err);
                });
            }
        });

        // Socket for getting the game info
        socket.on('getGameInfo', (data) => {

            // Get the game info
            let game = getGameInfo(data.roomName);

            // Send the game info to the room
            io.to(data.roomName).emit('gameInfo', game);
        });

        // Socket for voting for a player
        socket.on('vote' , (data) => {

            // Vote for the player
            voteForPlayer(data.roomName, data.votee, data.voter);

            // Send the information to the room
            io.to(data.roomName).emit('gameInfo', getGameInfo(data.roomName));
        });

        // Socket for passing the vote
        socket.on('pass', (data) => {

            // Pass the vote
            passVote(data.roomName, data.voter);

            // Send the information to the room
            io.to(data.roomName).emit('gameInfo', getGameInfo(data.roomName));
        });

        // Socket for handling the timeout
        socket.on('timeout' , (data) => {

            // Handle the timeout
            handleTimeout(data.roomName);

            // Send the information to the room
            io.to(data.roomName).emit('gameInfo', getGameInfo(data.roomName));

            gameInfo = getGameInfo(data.roomName);

            if (gameInfo.isBotTurn) {
                (async () => {
                    await handleBotTurns(data.roomName);
                    console.log('Bot turns handled for room:', data.roomName);

                    let gameInfo2 = getGameInfo(data.roomName);
            
                    console.log('Game phase:', gameInfo2.phase);
                    if (gameInfo2.phase == "vote") {
                        console.log('Setting timeout for vote phase in room:', data.roomName);
                        setTimeout(() => {
                            handleTimeout(data.roomName);
                            io.to(data.roomName).emit('gameInfo', getGameInfo(data.roomName));
                        }, 21000);
                    }

                })().catch(err => {
                    console.error('Error handling bot turns:', err);
                });
            }

            console.log('Game phase:', gameInfo.phase);
            if (gameInfo.phase == "vote") {
                console.log('Setting timeout for vote phase in room:', data.roomName);
                setTimeout(() => {
                    handleTimeout(data.roomName);
                    io.to(data.roomName).emit('gameInfo', getGameInfo(data.roomName));
                }, 21000);
            }


        });

        // Socket for handling the next round
        socket.on('nextRound', (data) => {

            // Handle the next round
            nextRound(data.roomName);

            // Send the information to the room
            io.to(data.roomName).emit('gameInfo', getGameInfo(data.roomName));
        });

        // Socket for handling the end of the game
        socket.on('endGame', (data) => {
            // Delete the game
            deleteGame(data.roomName);
        });


        // socket for leaving the room
        socket.on('disconnect', () => {

            // Set a timeout to allow the user to reconnect
            setTimeout(() => {
                // Remove the user from the room
                let action = removePlayer(socket.id);
                if(action) {
                    // Log
                    console.log('A player disconnected: ' + socket.id);
                }
            }, 5000);
        });
    });

    async function handleBotTurns(roomName) {
        let gameInfo = getGameInfo(roomName);

        while (gameInfo.isBotTurn && gameInfo.phase == "messaging") {
            await botMessage(roomName);
            console.log('Bot message sent to room:', roomName);

            await new Promise(resolve =>
                setTimeout(resolve, Math.floor(Math.random() * 12000) + 8000)
            ); 

            io.to(roomName).emit('gameInfo', getGameInfo(roomName));
            gameInfo = getGameInfo(roomName);
        }

        return gameInfo;
    }
}

