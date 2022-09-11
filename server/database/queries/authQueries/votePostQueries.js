const connection = require('../../config/connections');

const findVoteById = ({ post_id, user_id }) => connection
    .query('select * from votes where post_id = $1 and user_id = $2', [post_id, user_id]);

const incrementVotes = ({ post_id, num }) => connection
    .query(`update posts set votes_count = votes_count + $2 where posts.id = $1 returning votes_count`, [post_id, num]);

const decrementVotes = ({ post_id, num }) => connection
    .query(`update posts set votes_count = votes_count - $2 where posts.id = $1 returning votes_count`, [post_id, num]);

const insertStatus = ({ post_id, user_id, status }) => connection
    .query(`INSERT INTO votes (post_id, user_id, status) VALUES ($1, $2, $3)`, [post_id, user_id, status]);

const updateStatus = ({ post_id, user_id, status }) => connection
    .query(`update votes set status = $3 where post_id = $1 and user_id = $2`, [post_id, user_id, status]);

module.exports = {
    findVoteById, incrementVotes, decrementVotes, insertStatus, updateStatus
};

