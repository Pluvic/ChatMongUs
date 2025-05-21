<script>
    // Import the back function from the navigation module
    import { back } from "../lib/navigation";
    import Profile from "../components/Profile.svelte";
</script>

<main>
    <div>
        <button on:click = {back}>Back</button>
    </div>
    <h1>Rules</h1>

    <div class = "rules">
        <p>ChatMongUs is a game inspired by the popular game Among Us. The game is played in a chat room where players are assigned roles. The game is divided into rounds, each round has three phases: messaging, voting, and results. The game ends when there is one human left in the conversation .</p>
    </div>

    <footer>
        <Profile />
    </footer>
</main>

<style>
    main {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    h1 {
        color: #ffffff;
        font-size: 2em;
        margin-bottom: 0.5em;
        text-align: center;
    }

    .rules {
        background-color: white;
        border-radius: 10px;
        margin : 1em;
    }
    p {
        line-height: 200%;
        margin-left : 1em;
        margin-right : 1em;
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

    footer {
        width: 100%;
        color: #fff;
        text-align: center;
        margin-bottom: 1em;
        margin-top: 2em;
    }
</style>