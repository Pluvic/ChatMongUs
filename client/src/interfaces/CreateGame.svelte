<script>
    // Import the necessary Svelte components and stores
    import Profile from "../components/Profile.svelte";
    import { back, game } from "../lib/navigation.js";
    import { currentRoom } from "../stores/room";
    import config from "../lib/config.js";

    // Define the local variables for the game creation form
    let roomName = "";
    let maxPlayers = 0;
    let numBots = 0;

    // Function to handle the form submission and create a new game room
    async function createGame() {

        const response = await fetch(config.FRONT_END_URL + ":3000/create-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ roomName, maxPlayers, numBots })
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            console.error("Failed to create room:", response.statusText);
            return;
        }

        // Set the current room name in the store and navigate to the game page
        currentRoom.set(roomName);
        game();
    }
</script>

<main>
    <div class = "top">
        <button id="backButton" on:click = {back}>Back</button>
        <h1 id="title">Create a Game</h1>
    </div>
    <form on:submit|preventDefault={createGame}>
        <h2>Name</h2>
        <input type="text" bind:value={roomName} id="name" required>

        <h2>Number of Players</h2>
        <input type="number" bind:value={maxPlayers} id="players" required>

        <h2>Number of Bots</h2>
        <input type="number" bind:value={numBots} id="bots" required>

        <button type="submit">Create</button>
    </form>

    <footer>
        <Profile />
    </footer>
</main>

<style>
    /* Style of the page */
    main {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height:100vh;
        width:100vw;
        margin: 0 auto;
        padding: 0;
        
    }
    #title {
        text-align: center;
        font-size: 2em;
        color: white;
    }
    form {
        margin-left: 4em;
    }

    #backButton {
        margin: 1em;
        padding: 0.5em 1em;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
    }

    footer {
        width: 100%;
        color: #fff;
        text-align: center;
        margin-bottom: 1em;
        margin-top: 2em;
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

