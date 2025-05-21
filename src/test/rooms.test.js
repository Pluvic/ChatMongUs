const { resetRooms, addRoom, removeRoom, getRooms, getRoomInfo, getUsers, addPlayer, removePlayer, addBot, removeBot, addMessage, startGame, getGameInfo, addMessageGame, voteForPlayer, passVote, deleteGame } = require("../modules/rooms");

describe("Rooms Module", () => {

    beforeEach(() => {
        // Reset the modules state before each test
        resetRooms();
    });

    test("addRoom should add a room", () => {
        const roomName = "Test Room";
        const maxPlayers = 4;
        const numBots = 2;

        const room = addRoom(roomName, maxPlayers, numBots);
        expect(room).toEqual({
            roomName,
            roomState : "lobby",
            numPlayers : 0,
            maxPlayers,
            numBots,
            players : [],
            conversation : []
        });

        const rooms = getRooms();
        expect(rooms).toEqual([room]);
    });

    test("removeRoom should remove a room", () => {
        const roomName = "Test Room 2";
        const maxPlayers = 4;
        const numBots = 2;

        addRoom(roomName, maxPlayers, numBots);
        removeRoom(roomName);

        const rooms = getRooms();
        expect(rooms).toEqual([]);
    });

    test("getRooms should return all rooms", () => {
        const roomName1 = "Test Room 1";
        const maxPlayers1 = 4;
        const numBots1 = 2;

        const roomName2 = "Test Room 2";
        const maxPlayers2 = 6;
        const numBots2 = 3;

        addRoom(roomName1, maxPlayers1, numBots1);
        addRoom(roomName2, maxPlayers2, numBots2);

        const rooms = getRooms();
        expect(rooms.length).toBe(2);
        expect(rooms[0]).toEqual({
            roomName: roomName1,
            roomState : "lobby",
            numPlayers : 0,
            maxPlayers : maxPlayers1,
            numBots : numBots1,
            players : [],
            conversation : []
        });
        expect(rooms[1]).toEqual({
            roomName: roomName2,
            roomState : "lobby",
            numPlayers : 0,
            maxPlayers : maxPlayers2,
            numBots : numBots2,
            players : [],
            conversation : []
        });
    
    });

    test("Add and remove player", () => {
        const roomName = "Test Room 3";
        const maxPlayers = 4;
        const numBots = 2;

        let room = addRoom(roomName, maxPlayers, numBots);
        const playerName = "Player1";

        // Add player
        addPlayer("socket123", roomName, "user123", playerName);

        room = getRooms().find(r => r.roomName === roomName);
        expect(room.players.length).toBe(1);
        expect(room.players).toContainEqual({
            id : "socket123",
            userID : "user123",
            userName : playerName,
        });

        // Remove player
        removePlayer("socket123");

        room = getRooms().find(r => r.roomName === roomName);
        expect(room.players.length).toBe(0);

    });

    test("Add and remove bot", () => {
        const roomName = "Test Room 4";
        const maxPlayers = 4;
        const numBots = 2;

        let room = addRoom(roomName, maxPlayers, numBots);

        // Add bot
        addBot(roomName);
        room = getRooms().find(r => r.roomName === roomName);
        expect(room.numBots).toBe(3);

        // Remove bot
        removeBot(roomName);
        room = getRooms().find(r => r.roomName === roomName);
        expect(room.numBots).toBe(2);
        
    });

    test("getRoomInfo should return room info", () => {
        const roomName = "Test Room 5";
        const maxPlayers = 4;
        const numBots = 2;

        addRoom(roomName, maxPlayers, numBots);
        const roomInfo = getRoomInfo(roomName);

        expect(roomInfo).toEqual({
            roomName,
            roomState : "lobby",
            numPlayers : 0,
            maxPlayers,
            numBots,
            players : [],
            conversation : []
        });
    });

    test("Add message", () => {
        const roomName = "Test Room 6";
        const maxPlayers = 4;
        const numBots = 2;

        let room = addRoom(roomName, maxPlayers, numBots);
        const userName = "User1";
        const message = "Hello, world!";

        // Add message
        addMessage(roomName, message, userName);

        room = getRooms().find(r => r.roomName === roomName);
        expect(room.conversation.length).toBe(1);
        expect(room.conversation[0]).toEqual({text:message, sender: userName});
    });

    test("startGame should start the game", () => {
        const roomName = "Test Room 7";
        const maxPlayers = 4;
        const numBots = 2;

        addRoom(roomName, maxPlayers, numBots);
        const game = startGame(roomName);

        expect(game).toEqual(getGameInfo(roomName));

        const room = getRooms().find(r => r.roomName === roomName);
        expect(room.roomState).toBe("game");

    });

    test("getUsers should return users in a room", () => {
        const roomName = "Test Room 8";
        const maxPlayers = 4;
        const numBots = 2;

        addRoom(roomName, maxPlayers, numBots);
        const playerName1 = "Player1";
        const playerName2 = "Player2";

        addPlayer("socket123", roomName, "user123", playerName1);
        addPlayer("socket456", roomName, "user456", playerName2);

        const users = getUsers(roomName);
        expect(users).toEqual([
            { id : "socket123", userID : "user123", userName : playerName1 },
            { id : "socket456", userID : "user456", userName : playerName2 }
        ]);
    });

    test("addMessageGame should add a message to the game", () => {
        const roomName = "Test Room 9";
        const maxPlayers = 4;
        const numBots = 2;

        let room = addRoom(roomName, maxPlayers, numBots);
        const userName = "User1";
        const message = "Game started!";

        // Start the game first
        startGame(roomName);

        // Add message to the game
        addMessageGame(roomName, message, userName);

        const game = getGameInfo(roomName);
        expect(game.messages.length).toBe(1);
        expect(game.messages[0]).toEqual({text:message, sender: userName, isBot : false});
    });

    test("voteForPlayer should add a vote for a player", () => {
        const roomName = "Test Room 10";
        const maxPlayers = 4;
        const numBots = 2;

        addRoom(roomName, maxPlayers, numBots);

        // Start the game first
        startGame(roomName);

        // Vote for a player
        voteForPlayer(roomName, "Player2", "User1");

        const game = getGameInfo(roomName);
        expect(game.votes.length).toBe(1);
        expect(game.votes[0]).toEqual({voter : "User1", vote : "Player2"});
    });

    test("passVote should pass the vote", () => {
        const roomName = "Test Room 11";
        const maxPlayers = 4;
        const numBots = 2;

        addRoom(roomName, maxPlayers, numBots);

        // Start the game first
        startGame(roomName);

        // Pass the vote
        passVote(roomName, "User1");

        const game = getGameInfo(roomName);
        expect(game.votes.length).toBe(1);
        expect(game.votes[0]).toEqual({voter : "User1", vote : "pass"});
    });

    test("deleteGame should delete the game", () => {
        const roomName = "Test Room 12";
        const maxPlayers = 4;
        const numBots = 2;

        const room = addRoom(roomName, maxPlayers, numBots);

        // Start the game first
        startGame(roomName);

        // Delete the game
        deleteGame(roomName);

        const game = getGameInfo(roomName);
        expect(game).toEqual(null);
        expect(room.roomState).toBe("lobby");
    });
});