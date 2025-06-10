<script>
    // Import necessary modules and components
    import ioClient from 'socket.io-client';
    import { onMount } from "svelte";
    import { userName } from '../../stores/store';
    import { currentRoom, numPlayers, roomState, numBots, maxPlayers, conversation, users } from '../../stores/room';
    import { nickname, currentTheme, players, turn, isBotTurn, phase, messages, hasAlreadyVoted, deadPlayers, winner } from '../../stores/game';
    import Lobby from './Lobby.svelte';
    import Game from './Game.svelte';
    import config from '../../lib/config';

    // Function to generate a random room ID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Define the local variables from localStorage
    let userID = localStorage.getItem('userId') || generateUUID();
    let roomID = $currentRoom || localStorage.getItem('roomID');

    // Define the socket variable
    let socket = ioClient(config.FRONT_END_URL + ":3000");
  
    onMount(() => {

        // Set the userID and roomID in localStorage
        localStorage.setItem('userId', userID);
        localStorage.setItem('roomID', roomID);
        currentRoom.set(roomID);

        // Connect to the WebSocket server
        socket.on("connect", () => {
            console.log("Connected to WebSocket server");
            
            console.log(userID);
            socket.emit("joinRoom", {roomName: roomID, userName: $userName, userID});

        });

        // Listen for the update of users in the room
        socket.on("roomInfo", (data) => {

            // Update the room information
            users.set(data.players);
            numPlayers.set(data.numPlayers);
            numBots.set(data.numBots);
            maxPlayers.set(data.maxPlayers);
            conversation.set(data.conversation);
            roomState.set(data.roomState);

            if (data.roomState == "game") {
                socket.emit("getGameInfo", {roomName: roomID});
            }
            
        });

        // Listen for the update of the conversation
        socket.on('message', (data) => {
            conversation.set(data);
        });

        // Listen for the update of the game state
        socket.on('gameInfo', (data) => {

            // Update the game state
            roomState.set("game");
            currentTheme.set(data.currentTheme);
            players.set(data.playersGame);
            turn.set(data.turn);
            phase.set(data.phase);
            isBotTurn.set(data.isBotTurn);
            messages.set(data.messages);
            deadPlayers.set(data.deadPlayers);
            winner.set(data.winner);

            // Set the nickname of the player
            let player = data.playersGame.find(player => player.userID == userID);
            nickname.set(player.nickname);

            // Set the hasAlreadyVoted state
            let hasAlreadyVote = data.votes.find(vote => vote.voter == $nickname);
            hasAlreadyVoted.set(hasAlreadyVote);

        });

        return () => {
            // Clean up the WebSocket connection when the component unmounts
            socket.disconnect();
            console.log("WebSocket disconnected");
        };

    });

</script>
  
<main>
    {#if $roomState == "lobby"}
        <Lobby {socket} />
    {/if}
    {#if $roomState == "game"}
        <Game {socket} />
    {/if}
</main>

