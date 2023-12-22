const {dbConnect, Pool} = require('pg')
const db = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    password: "sridharan",
    port:5432,
    database:"bookmark"
});

module.exports = db;
