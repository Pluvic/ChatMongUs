<script>
    // Import necessary Svelte stores and components
    import { currentRoom, numPlayers, numBots, maxPlayers, users, conversation, roomState, language } from "../../stores/room";
    import { userName } from "../../stores/store";
    import { back } from "../../lib/navigation";

    // Take the socket variable from the parent component
    export let socket;
    
    // Define local variables
    let message = "";
    let phoneUp = false;

    // function to add a bot to the room
    function addbot() {
        socket.emit("addBot", {roomName: $currentRoom});
        console.log("Bot added to " + $currentRoom);
    }

    // function to remove a bot from the room
    function removeBot() {
        socket.emit("removeBot", {roomName: $currentRoom});
        console.log("Bot removed to " + $currentRoom);
    }

    // function to send a message to the server
    function sendMessage() {
        socket.emit("message", {text: message, sender: getUsername(), roomName: $currentRoom});
        message = "";
    }

    // function to toggle the phone screen visibility
    function togglePhone() {
        phoneUp = !phoneUp;
    }

    // function to start the game
    function startGame() {
        socket.emit("startGame", {roomName: $currentRoom, language: $language});
        roomState.set("game");
    }

    function getUsername() {
        if ($userName == null) {
            // Get the index of the user in the users array
            const index = $users.findIndex(user => user.userID === localStorage.getItem('userId'));
            return "Invité " + index;
        } else {
            return $userName;
        }
    }

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
    ];
</script>


<main>
    <div class="room-info">
        <h1>{$currentRoom}</h1>

        <select id="language-select" bind:value={$language}>
            {#each languages as lang}
                <option value={lang.code}>{lang.label}</option>
            {/each}
        </select>

        <h2>Number of player: {$numPlayers + $numBots} / {$maxPlayers}</h2>
        <h2>Users in the room:</h2>
        <ul class = "participants">
            {#each $users as user, i}
                {#if user.userName == null}
                    <li>Invité {i}</li>
                {:else}
                    <li>{user.userName}</li>
                {/if}
            {/each}
            {#each {length: $numBots} as _, key}
                <li>Bot {key + 1}</li>
                
            {/each}
        </ul>
        {#if $numBots + $numPlayers < $maxPlayers}
            <p>Waiting for players...</p>
        {:else}
            <p>Room is full</p>
        {/if}
        <button on:click = {() => back()} id = "mainButton" class="leaveButton">Leave Game</button>

        {#if $numPlayers + $numBots != $maxPlayers}
            <button class="startButton" disabled>Start Game</button>
        {:else}
            <button on:click = {() => startGame()} id = "mainButton" class="startButton">Start Game</button>
        {/if}

        {#if $numBots + $numPlayers < $maxPlayers}
            <button on:click = {() => addbot() } id = "mainButton" class = "botButton">Add Bot</button>
        {:else}
            <button on:click = {() => addbot()} class = "botButton" disabled>Add Bot</button>
        {/if}
        
        {#if $numBots > 0}
            <button on:click = {() => removeBot()} id = "mainButton" class = "botButton">Remove Bot</button>
        {:else}
            <button on:click = {() => removeBot()} class = "botButton" disabled>Remove Bot</button>
        {/if}
    </div>

    <div class = "phone-container {phoneUp ? 'phone-up' : ''}">
        <button class="topPhone" on:click={togglePhone} on:keydown={(e) => e.key === 'Enter' && togglePhone()} aria-label="Toggle phone"></button>
        <div class = "phone-screen">
            
                <h2>Chat</h2>
            
        
            <div class="conversation">
                {#each $conversation as msg, i}
                    <p class="{msg.sender !== $userName ? 'user-msg' : 'other-msg'}">
                    <strong>{msg.sender !== "server" ? msg.sender : 'Server'}:</strong> {msg.text}
                    </p>
                {/each}
            </div>
        
            <form on:submit|preventDefault={sendMessage}>
                <input class = "input-box" type="text" bind:value={message} placeholder="Type your message" required>
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
</main>
  
<style>
    /* Style of the page */
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        padding: 20px;
        overflow : hidden;
    }

    h1 {
        color: white;
    }

    .room-info {
        text-align: center;
    }

    .participants {
        list-style: none;
        padding: 0;
    }

    .phone-container {
        position: fixed;
        bottom: -70%;
        width: 80%;
        height: 70%;
        background: black;
        border-radius: 20px;
        transition: transform 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }

    .phone-up {
        transform: translateY(-80vh);
    }

    .phone-screen {
        width: 90%;
        height: 95%;
        background: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .input-box {
        width: 90%;
    }

    .topPhone {
        width: 20%;
        height: 2%;
    }

    .conversation {
        width: 90%;
        height: 60%;
        overflow-y: auto; 
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
        background: #f9f9f9;
        border-radius: 5px;
    }

    .user-msg {
      text-align: right;
      color: blue;
    }
  
    .other-msg {
      text-align: left;
      color: green;
    }

    .botButton {
        margin: 1em;
        padding: 0.5em 1em;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
    }

    .startButton {
        margin: 1em;
        padding: 0.5em 1em;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
    }
    .leaveButton {
        margin: 1em;
        padding: 0.5em 1em;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 5px;
    }

    #mainButton:hover {
        background-color: #0056b3;
        cursor: pointer;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

</style>