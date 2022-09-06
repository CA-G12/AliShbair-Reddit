const { join } = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const router = require('./routes');
require('env2')('.env');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.disable('x-powered-by');

// app.use(router);
app.use(express.static(join(__dirname, '..', 'client')));

module.exports = app;