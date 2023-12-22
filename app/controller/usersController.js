const db = require('../../config/db');

exports.checkMobile = async (req, res) => {

    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
};
