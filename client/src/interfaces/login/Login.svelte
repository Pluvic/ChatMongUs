<script>
    // Import the necessary modules
    import { login } from '../../lib/authentification.js';
    import { back } from '../../lib/navigation.js';

    // Define the variables
    let username = '';
    let password = '';
    
</script>

<button on:click = {back} id = "back">Back</button>
<h1>Login</h1>


<form on:submit|preventDefault = {() => login(username, password)}>
    <div id = username>
        <h2>Username</h2>
        <input type="text" bind:value={username} id="username" name="username" required>
    </div>
    <div id = password>
        <h2>Password</h2>
        <input type="password" bind:value={password} id="password" name="password" required>
    </div>
    <button type="submit">Login</button>
</form>

<style>
    /* Style of the page */
    #back {
        margin: 10px;
    }

    h1 {
        text-align: center;
        color: white;
    }

    h2 {
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
    }

    input {
        margin: 10px;
    }

    button {
        margin: 10px;
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