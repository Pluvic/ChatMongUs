<script>
    // Import necessary modules and components
    import Profile from "../components/Profile.svelte";
    import { back, game } from "../lib/navigation.js";
    import { getGames } from "../stores/store.js";
    import { currentRoom } from "../stores/room";

    // Dictionnary which represents game
    let games = [];
    let searchGame = "";

    // Function to fetch games from the server
    getGames().then(data => {
        games = data;
    });

    // Function to join a game
    /**
     * @param {string} id
     */
    function joinGame(id) {
        console.log("Joining game with id: " + id);
        currentRoom.set(id);
        game();
    }

    // Function to search for a game
    /**
     * @param {string} search
     */
    function search(search) {
        searchGame = search;
    }

    
    
</script>

<main>
    <header>
        <button on:click = {back}>Back</button>

        <!-- Search Bar -->
        <form on:submit|preventDefault = {() => search(searchGame)}>
            <input type="text" id="searchBar" bind:value={searchGame} required>
        </form>
    </header>

    <!-- List of games -->
    <div class = "games">
        <ul>
            {#each games as game}
                {#if game.roomName.includes(searchGame)}
                    <li>
                        <h2>{game.roomName}</h2>
                        <p>Players: {game.numPlayers}/{game.maxPlayers}</p>
                        <p>Status: Lobby</p>
                        <button on:click={() => joinGame(game.roomName)}>Join</button>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>

    <footer>
        <Profile />
    </footer>
</main>

<style>
    /* Style of the page */
    main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    header {
        margin: 1em;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }

    footer {
        padding: 10px;
        text-align: center;
    }

    .games {
        width: 90%;
        height: 70vh;
        overflow-y: auto;
        padding: 10px;
        
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        border: 1px solid black;
        margin: 5px;
        padding: 10px;
        border-radius: 5px;
        background: #fafafa;
    }

    button {
        padding: 0.5em 1em;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
    }
</style>