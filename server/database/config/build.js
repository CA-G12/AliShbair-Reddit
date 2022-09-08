const { readFileSync } = require('fs');
const { join } = require('path');
const connection = require('./connections');

const buildDB = () => {
    const sql = readFileSync(join(__dirname, 'build.sql')).toString();
    return connection.query(sql);
};

module.exports = buildDB;