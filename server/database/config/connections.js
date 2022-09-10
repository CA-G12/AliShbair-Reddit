require('env2')('.env');
const { Pool } = require('pg');
const { NODE_ENV, DEV_DB_URL, TEST_DB_URL, DATABASE_URL } = process.env;

let connectionString = '';
let ssl = false;

switch (NODE_ENV) {
    case 'development':
        connectionString = DEV_DB_URL;
        break;
    case 'production':
        connectionString = DATABASE_URL;
        ssl = { rejectUnauthorized: false };
        break;
    case 'test':
        connectionString = TEST_DB_URL;
        break;
    default:
        throw new Error('The database url is invalid!');
}

const connection = new Pool({
    connectionString,
    ssl,
});

module.exports = connection;