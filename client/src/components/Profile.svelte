<script>
    // Import the writable store
    import { currentPage, isConnected, userName } from "../stores/store";
    
    // Function to change the current page to the login page
    function login() {
        currentPage.set("login");
    }

    // Function to change the current page to the register page
    function register() {
        currentPage.set("register");
    }
</script>

{#if $isConnected}
    <p>{$userName}</p>
    <button>Profile</button>
{:else}
    <button on:click={login}>Login</button>
    <button on:click={register}>Register</button>
{/if}


<style>
    /* Styling for the buttons */
    button {
        background-color: #4CAF50;
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 1em 1em;
        cursor: pointer;
        border-radius: 12px;
        padding: 10px 24px;
        border : 1px solid white;
    }

    button:hover {
        background-color: #45a049;
    }

    button:active {
        background-color: #3e8e41;
    }
</style>