const { findVoteById, insertStatus, updateStatus, incrementVotes, decrementVotes } = require('../../database/queries/authQueries/votePostQuery');

const likePost = (req, res, next) => {
    const post_id = req.params.id;
    const user_id = req.user.id;
    findVoteById({ post_id, user_id })
        .then(vote => {
            if (!vote.rowCount) {
                return insertStatus({ post_id, user_id, status: 'like' })
                    .then(() => incrementVotes({ post_id, num: 1 }))
                    .catch(next)
            } else if (vote.rows[0].status === 'like') {
                res.json({ msg: 'You Already liked this post' })
            } else {
                return updateStatus({ post_id, user_id, status: 'like' })
                    .then(() => incrementVotes({ post_id, num: 2 }))
                    .catch(next)
            }
        })
        .catch(next)
};

const dislikePost = (req, res, next) => {
    const post_id = req.params.id;
    const user_id = req.user.id;
    findVoteById({ post_id, user_id })
        .then(vote => {
            if (!vote.rowCount) {
                return insertStatus({ post_id, user_id, status: 'dislike' })
                    .then(() => decrementVotes({ post_id, num: 1 }))
                    .catch(console.log)
            } else if (vote.rows[0].status === 'dislike') {
                res.json({ msg: 'You Already disliked this post' })
            } else {
                return updateStatus({ post_id, user_id, status: 'dislike' })
                    .then(() => decrementVotes({ post_id, num: 2 }))
                    .catch(console.log)
            }
        })
        .catch(next)
};

module.exports = { likePost, dislikePost };



