const db = require('../../config/db');

exports.checkMobile = async (req, res) => {

    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
};

exports.addUser = async (req, res) => {
    try {
        const { phone, uid } = req.body;

        // Validate input
        if (!phone) {
            return res.status(400).json({ error: 'Phone is a required field' });
        }

        // Check if the phone number already exists in the database
        const existingUser = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'User with this phone number already exists' });
        }

        // Insert the new user into the database
        const result = await db.query('INSERT INTO users (phone, auth_id) VALUES ($1, $2) RETURNING *', [phone, uid]);

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

