const getProfileQuery = require('../../database/queries/publicQuerie/getProfileQuery');

const getProfile = (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'html', 'profile.html'));

};

module.exports = getProfile;