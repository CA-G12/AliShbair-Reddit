/* eslint-disable no-unused-vars */
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

app.use(router);
app.use((req, res, _next) => {
    res.status(404).send('page not found');
    // res.sendFile(join(__dirname, '..', 'client', 'html', '404.html'));
});

app.use((err, req, res, next) => {
    console.log('Error:', err);
    if (err.status) {
        return res.json({ msg: err.msg, status: err.status })
    }
    return res.status(500).send('server error');
    // res.status(500).sendFile(join(__dirname, '..', 'client', 'html', '500.html'));
});

module.exports = app;