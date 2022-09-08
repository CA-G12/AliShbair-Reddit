const getProfileQuery = require('../../database/queries/publicQueries/getProfileQuery');

const getProfile = (req, res) => {
    console.log('getProfile Function');
    res.sendFile(join(__dirname, '..', 'client', 'html', 'profile.html'));

};

module.exports = getProfile;