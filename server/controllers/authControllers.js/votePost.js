const { findVoteById, insertStatus, updateStatus, incrementVotes, decrementVotes } = require('../../database/queries/authQueries/votePostQueries');

const votePost = (req, res, next) => {
    const statusRequest = req.params.info.split('.')[1]
    const post_id = req.params.info.split('.')[0]
    const user_id = req.user.id;
    findVoteById({ post_id, user_id })
        .then(vote => {
            if (statusRequest === 'like') {
                if (!vote.rowCount) {
                    return insertStatus({ post_id, user_id, status: statusRequest })
                        .then(() => incrementVotes({ post_id, num: 1 }))
                        .then(newCount => res.json({ msg: newCount.rows[0].votes_count }))
                        .catch(err => next(err))
                } else if (vote.rowCount && vote.rows[0].status === 'like') {
                    return updateStatus({ post_id, user_id, status: 'none' })
                        .then(() => decrementVotes({ post_id, num: 1 }))
                        .then(newCount => res.json({ msg: newCount.rows[0].votes_count }))
                        .catch(err => next(err))
                } else if (vote.rowCount && vote.rows[0].status === 'dislike') {
                    return updateStatus({ post_id, user_id, status: 'like' })
                        .then(() => incrementVotes({ post_id, num: 2 }))
                        .then(newCount => res.json({ msg: newCount.rows[0].votes_count }))
                        .catch(err => next(err))
                } else if (vote.rows[0].status === 'none') {
                    return updateStatus({ post_id, user_id, status: 'like' })
                        .then(() => incrementVotes({ post_id, num: 1 }))
                        .then(newCount => res.json({ msg: newCount.rows[0].votes_count }))
                        .catch(err => next(err))
                }
            } else if (statusRequest === 'dislike') {
                if (!vote.rowCount) {
                    return insertStatus({ post_id, user_id, status: statusRequest })
                        .then(() => decrementVotes({ post_id, num: 1 }))
                        .then(newCount => res.json({ msg: newCount.rows[0].votes_count }))
                        .catch(err => next(err))
                } else if (vote.rowCount && vote.rows[0].status === 'dislike') {
                    return updateStatus({ post_id, user_id, status: 'none' })
                        .then(() => incrementVotes({ post_id, num: 1 }))
                        .then(newCount => res.json({ msg: newCount.rows[0].votes_count }))
                        .catch(err => next(err))
                } else if (vote.rowCount && vote.rows[0].status === 'like') {
                    return updateStatus({ post_id, user_id, status: 'dislike' })
                        .then(() => decrementVotes({ post_id, num: 2 }))
                        .then(newCount => res.json({ msg: newCount.rows[0].votes_count }))
                        .catch(err => next(err))
                } else if (vote.rowCount && vote.rows[0].status === 'none') {
                    return updateStatus({ post_id, user_id, status: 'dislike' })
                        .then(() => decrementVotes({ post_id, num: 1 }))
                        .then(newCount => res.json({ msg: newCount.rows[0].votes_count }))
                        .catch(err => next(err))
                }
            }
        })
        .catch(err => next(err))
};

module.exports = votePost;



