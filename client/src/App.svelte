<script>
    // Import the necessary stores and components
    import { onMount } from 'svelte';
    import { currentPage, checkAuthentification } from './stores/store.js';
    import Home from './interfaces/Home.svelte';
    import CreateGame from './interfaces/CreateGame.svelte';
    import JoinGame from './interfaces/JoinGame.svelte';
    import Login from './interfaces/login/Login.svelte';
    import Register from './interfaces/login/Register.svelte'
    import Room from './interfaces/game/Room.svelte';
    import History from './interfaces/History.svelte';
    import Rules from './interfaces/Rules.svelte';

    // As the app starts, we check if the user is authenticated and redirect them to their last page
    onMount(() => {
        // Check if the user is connected
        checkAuthentification();

        // Redirect the user to his last page
        if (localStorage.getItem('lastPage') !== null) {
            currentPage.set(localStorage.getItem('lastPage'));
        }
    });
</script>

<main>
    <!-- Display the current page -->
    {#if $currentPage == 'createGame'}
        <CreateGame />
    {:else if $currentPage == 'joinGame'}
        <JoinGame />
    {:else if $currentPage == 'login'}
        <Login />
    {:else if $currentPage == 'register'}
        <Register />
    {:else if $currentPage == 'game'}
        <Room />
    {:else if $currentPage == 'history'}
        <History />
    {:else if $currentPage == 'rules'}
        <Rules />
    {:else}
        <Home />
    {/if}
</main>