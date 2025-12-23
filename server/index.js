const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

app.get('/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) { res.status(500).json(err); }
});

app.put('/items/:id', async (req, res) => {
    try {
        const { stock } = req.body;
        const { id } = req.params;
        const result = await pool.query(
            'UPDATE items SET stock = $1 WHERE id = $2 RETURNING *',
            [stock, id]
        );
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json(err); }
});

// app.listen(5000, () => console.log('Server running on port 5000'));

const PORT = process.env.APP_API_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));