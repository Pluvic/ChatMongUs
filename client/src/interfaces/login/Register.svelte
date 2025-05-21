<script>
    // Import the necessary modules
    import { register } from '../../lib/authentification.js';
    import { back } from '../../lib/navigation.js';

    // Define the username and password variables
    let username = '';
    let password = '';
    
</script>

<button on:click = {back}>Back</button>
<h1>Register</h1>


<form on:submit|preventDefault = {() => register(username, password)}>
    <h2>Username</h2>
    <input type="text" bind:value={username} id="username" name="username" required>

    <h2>Password</h2>
    <input type="password" bind:value={password} id="password" name="password" required>

    <button type="submit">Register</button>
</form>

<style>
    /* Style of the page */
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