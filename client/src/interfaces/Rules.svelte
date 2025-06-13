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
        <h1>How To Play</h1>
        <p>ChatMongUs is a game inspired by the popular game Among Us. The game is played in a chat room where players are assigned roles. The game is divided into rounds, each round has three phases: messaging, voting, and results. The game ends when there is one human left in the conversation .</p>
        <h2>Talking Phase</h2>
        <p>First, a name and a random image are assigned to each player and bots. To identify yourself on the interface, no problem, your name appears in blue while all the others appear in black. A first theme is given and the starting player is randomly selected, which can be an artificial intelligence. The first player/bot has 30 seconds to write a message related to the theme. Note that if you do not write anything and the timer drops to 0, then a random message will appear, most likely unrelated to the theme, so don't waste too much time thinking about it. Each player writes a message one after the other until we have gone round the table. </p>
        <h2>Voting Phase</h2>
        <p>Once everyone has written their message, a voting phase begins. Each human has two choices. 1. Vote for someone you suspect to be a human. 2. Pass and not vote this round. In the first case, if you vote against a human, you eliminate him and all's well with you, but if it's a bot, you are the one who will be eliminated. So it is important to use this vote with care. Hence the importance of being able to pass. All votes are counted. (Only humans vote). The results are revealed, along with who has died in the round. If more than one human remains, a new round starts, with a new theme and a new person. If only one human remains, he or she has automatically won the game. If there are no humans left, it's a bloodbath and artificial intelligence wins the game. So you'll have to be judicious in every message to avoid being betrayed in the eyes of your fellow players.</p>
        <h2>Game End</h2>
        <p>At the end of the game, the conversation is added to the history section if you are logged in. All players present in the game are returned to the lobby and a game can be restarted. You will find the lobby chat as it was before, and can chat before the next game as well as modify the number of bots as you wish.</p>
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
        color: black;
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
    h2 {
        margin-left: 1em;
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