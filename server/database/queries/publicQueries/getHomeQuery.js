const connection = require('../../config/connections');

const getAllPosts = () => connection.query('select * from posts ');

module.exports = getAllPosts;