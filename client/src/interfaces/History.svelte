<script>
    // Import the necessary modules and components
    import { back } from '../lib/navigation';
    import { getHistory } from '../stores/store';

    // Function to handle the back button click
    /**
     * @param {string} id
     */
    function seeMessages(id) {
        seeGames = false;
        messages = history.find(game => game.id == id).conversation;
        oldRoomName = id;
    }

    // Define the local variables
    let seeGames = true;
    let oldRoomName = "";
    let history = [];
    let messages = [];

    // Function to get the history of games
    getHistory().then(data => {
        history = data;
        console.log(data)
    });


</script>

<main>
    <button on:click = {back}>Back</button>
    <div class="history">
        <h1>History</h1>
        {#if seeGames}
            <p>Here you can see the history of your games</p>
            <div>
                <div class = "games">
                    {#each history as game}
                        <div class="game">
                            <p>Room Name: {game.roomName}</p>
                            <p>Number of Messages: {game.conversation.length}</p>
                            <button on:click={() => seeMessages(game.id)}>See</button>
                        </div>
                    
                    {/each}
                </div>
            </div>
        {:else}
            <h2>Here you can see the messages of the game {oldRoomName}</h2>
            <div class = "messages">
                {#each messages as message}
                    <p><strong>{message.sender} ({message.isBot ? 'Bot' : 'Human'})</strong> : {message.text}</p>
                {/each}
            </div>
        {/if}


    </div>
</main>

<style>
    /* Style of the page */
    main {
        height: 100vh;
    }
    .history {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        justify-content: center;
    }

    .game {
        border : 1px solid white;
        border-radius: 10%;
        padding : 1em;
        margin: 1em;
    }

    .games {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .messages {
        margin : 1em;
        overflow-y: auto;
        height: 70vh;
        width: 80%;
        background : white;
        border-radius: 20px;
        padding: 1em;
        overflow-y: auto;
    }

    button {
        margin: 1em;
    }

    h1 {
        color: #ffffff;
    }
    h2 {
        color: #ffffff;
        text-align: center;
    }

    p {
        color: #000000;
    }

    button {
        margin: 1em;
        padding: 0.5em 1em;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>