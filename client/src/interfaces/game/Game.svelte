<script>
    // Import necessary stores and assets
    import { currentRoom } from "../../stores/room";
    import robot1 from "../../assets/robot1.png";
    import robot2 from "../../assets/robot2.png";
    import robot3 from "../../assets/robot3.png";
    import robot4 from "../../assets/robot4.png";
    import robot5 from "../../assets/robot5.png";
    import robot6 from "../../assets/robot6.png";
    import { nickname, currentTheme, players, turn, phase, messages, isBotTurn, hasAlreadyVoted, deadPlayers, winner } from "../../stores/game";

    // Take the socket variable from the parent component
    export let socket;

    // Define local variables
    let message = "";
    let phoneUp = false;
    let countdown;
    let timer;
    let robotsImage = [robot1, robot2, robot3, robot4, robot5, robot6];

    // Function to start a timer given a time in seconds
    /**
     * @param {number} time
     */
    function startTimer(time) {
        countdown = time
        timer = setInterval(() => {
            countdown--;
            if (countdown == 0) {
                clearInterval(timer);
                handleTimeout();
            }
        }, 1000);
    }

    // Function to handle the timeout event
    function handleTimeout() {
        socket.emit("timeout", {roomName: $currentRoom});
    }

    // Function to send a message to the server
    function sendMessage() {
        socket.emit("gameMessage", {text: message, sender: $nickname, roomName: $currentRoom});
        message = "";
        clearInterval(timer);
    }

    // Function to toggle the phone screen visibility
    function togglePhone() {
        phoneUp = !phoneUp;
    }

    // Function to vote for a player
    /**
     * @param {string} nickName
     */
    function vote(nickName) {
        socket.emit("vote", {voter: $nickname, votee: nickName, roomName: $currentRoom});
    }

    // Function to pass the turn
    function pass() {
        socket.emit("pass", {voter: $nickname, roomName: $currentRoom});
    }

    // Listen for the game state updates from the server
    $ : if ($turn && $phase == "messaging") {
        clearInterval(timer);
        startTimer(30);

        if ($isBotTurn) {
            socket.emit("botMessage", {roomName: $currentRoom});
        }
    }

    // Listen for the phase to change in voting phase
    $ : if ($phase == "vote") {
        clearInterval(timer);
        startTimer(15);
    }

    // Listen for the phase to change in results phase
    $ : if ($phase == "results") {
        setTimeout(() => {
            socket.emit("nextRound", {roomName: $currentRoom});
        }, 5000);
    }

    // Listen for the phase to change in end phase
    $ : if ($phase == "end") {
        socket.emit("endGame", {roomName: $currentRoom});
    }

    $: radius = 90 + Math.max(0, ($players.length - 3) * 10); // Adjust base and scaling as needed

    function angle(i) {
        return (i * (360 / $players.length) + 270) % 360;
    }

</script>

<main>
    <h1>{$currentRoom}</h1>
    {#if $phase == "messaging"}
        <p>Current theme is : {$currentTheme}</p>
        <p>Its {$turn}'s turn ! <span>( {countdown}s left)</span></p>
    {:else if $phase == "vote"}
        <h2>Time to vote ! <span>( {countdown}s left)</span></h2>
    {:else if $phase == "results"}
        <h2>Results</h2>

    {:else if $phase == "end"}
        <h2>Game Over</h2>
        <h3>The winner is: {$winner}</h3>
    {/if}

    {#if $phase == "results"}
        {#if $deadPlayers.length > 0}
            <h2>Dead players:</h2>
            <ul>
                {#each $deadPlayers as deadPlayer}
                    <li>{deadPlayer}</li>
                {/each}
            </ul>
        {:else}
            <h2>No one died</h2>
        {/if}
    {:else if $phase == "end"}
        <button on:click = {() => window.location.href = "/"}>Back to lobby</button>
    {:else}
    <div class="circle-container">
        {#each $players as player, i}
            <div 
                class="player" 
                style="transform: rotate({angle(i)}deg) translate({radius}px) rotate(-{angle(i)}deg);"
            >
                <img src={robotsImage[i % robotsImage.length]} alt={player.nickname} />
                <div class="player-name" id="{player.nickname == $nickname ? 'playerActive' : 'otherPlayer'}">
                {player.nickname}
                </div>

                {#if $phase == "vote" && !$hasAlreadyVoted}
                <button on:click={() => vote(player.nickname)}>Vote</button>
                {:else}
                <button disabled>Vote</button>
                {/if}
            </div>
        {/each}
    </div> 
        {#if $phase == "vote" && !$hasAlreadyVoted}
            <button on:click={pass}>Pass</button>
        {/if}
        
    {/if}

    <div class = "phone-container {phoneUp ? 'phone-up' : ''}">
        <button class="topPhone" on:click={togglePhone} on:keydown={(e) => e.key === 'Enter' && togglePhone()} aria-label="Toggle phone"></button>
        <div class = "phone-screen">
            
            <h2>Chat</h2>
            
        
            <div class="conversation">
                {#each $messages as msg, i}
                    <p class="{msg.sender == $nickname ? 'user-msg' : 'other-msg'}">
                    <strong>{msg.sender !== "server" ? msg.sender : 'Server'}:</strong> {msg.text}
                    </p>
                {/each}
            </div>
        
            <form on:submit|preventDefault={sendMessage}>
                <input class = "input-box" type="text" bind:value={message} placeholder="Type your message" required>
                {#if $turn == $nickname}
                    <button type="submit">Send</button>
                {:else}
                    <button type="submit" disabled>Send</button>
                {/if}
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
        background-repeat: no-repeat;
        background-position: top;
        background-size: 80%;
        overflow : hidden;

    }

    p {
        padding-bottom: 1em;
    }

    .circle-container {
        width:100%;
        height: 50%;
        border-radius: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .player {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .player img {
        width: 50px;
        height: 50px;
        border-radius: 25%;
        object-fit: contain;
        border: 2px solid white;
    }

    .player-name {
        margin-top: 5px;
        font-size: 14px;
        text-align: center;
        font-weight: bold;
    }

    button {
        margin-top: 5px;
        padding: 5px 10px;
        font-size: 12px;
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

    #playerActive {
        color: rgb(235, 91, 24);
    }

    #otherPlayer {
        color: black;
    }
</style>