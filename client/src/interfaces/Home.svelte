<script>
    // Import necessary modules and components
	import Profile from "../components/Profile.svelte";
    import { joinGame, createGame, history, rules } from "../lib/navigation.js";   
</script>

<main>
    <header>
        <h1 id="title">ChatMongUs</h1>
    </header>

    <div id = "gameButtons">
        <button class="button-style" id="buttonJoinGame" on:click = {joinGame}>Join a Game</button>
        <button class="button-style" id="buttonCreateGame" on:click = {createGame}>Create a Game</button>
    </div>

    <div id="SecondaryButtons">  
        <button class="button-style" id="secondaryButton" style="margin:1em" on:click = {history}>History</button>
        <button class="button-style" id = "secondaryButton" style="margin:1em" on:click = {rules}>Rules</button>
    </div>

    <footer>
        <Profile />
    </footer>
</main>

<style>
    /* Global styles for the Home component */
    main {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 auto;
        height:100vh;
        width:100vw;
        padding: 0;
        position: absolute; top:0; left:0;
    }

    #title {
        text-align: center;
        font-size: 2em;
        color: #ffffff;
        margin-top: 2em;

    }

    #gameButtons {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0em 2em;
    }

    #SecondaryButtons {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1em 5em;
    }

    #secondaryButton {
        border-radius: 30px;
        max-width : 30em;
    }

    #buttonJoinGame {
        padding: 1em;
        margin: 0em;
        height: 4em;
        width: 80%;
        border-radius: 50px 50px 0px 0px;
        background-color:rgb(22, 93, 225);
        border : solid 1px white;
        max-width : 30em;
    }

    #buttonCreateGame {
        padding: 1em;
        margin: 0em;
        height: 4em;
        width: 80%;
        border-radius: 0px 0px 50px 50px;
        background-color: rgb(6, 190, 6);
        border : solid 1px white;
        max-width : 30em;
    }

    footer {
        width: 100%;
        color: #fff;
        text-align: center;
        margin-bottom: 1em;
    }

    button {
        font-size: 1em;
    }

    .button-style {
        appearance: button;
        background-color: #d1a30d;
        border: solid transparent;
        border-width: 0 0 4px;
        box-sizing: border-box;
        color: #FFFFFF;
        cursor: pointer;
        display: inline-block;
        font-family: din-round,sans-serif;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: .8px;
        line-height: 20px;
        margin: 0;
        outline: none;
        overflow: visible;
        padding: 13px 16px;
        text-align: center;
        user-select: none;
        -webkit-user-select: none;
        vertical-align: middle;
        white-space: nowrap;
        width: 100%;
        border : solid 1px white;
    }

    .button-style:hover:not(:disabled) {
        filter: brightness(1.1);
        -webkit-filter: brightness(1.1);
    }

</style>