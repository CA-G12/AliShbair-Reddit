const { join } = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
require('env2')('.env');
const router = require('./routes');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.disable('x-powered-by');

app.use(express.static(join(__dirname, '..', 'client')));

// app.use('/profile', (req, res) => {
//     res.sendFile(join(__dirname, '..', 'client', 'html', 'profile'));
// });

app.use('/api/v1/users', router);
app.use((req, res, next) => {
    res.status(404).send('page not found');
    // res.sendFile(join(__dirname, '..', 'client', 'html', '404.html'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.msg || 'something went wrong' });
});

module.exports = app;