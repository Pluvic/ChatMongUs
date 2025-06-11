const express = require('express');
const router = express.Router();
const pool  = require('../database/dataBase');

router.get('/history', async (req, res) => {

    // Select request to get the history of games
    const selectQuery = `SELECT * FROM history`;
    const result = await pool.query(selectQuery)

    const history = result.rows.map(row => ({
        id: row.id,
        roomName: row.room_name,
        conversation: JSON.parse(row.conversation),
    }));

    res.status(200).json(history);

})

module.exports = router;
