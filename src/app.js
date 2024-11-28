require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const {default : helmet} = require('helmet');
const compression = require('compression');

const app = express();
const routes = require('./routes');


app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))
//init route
app.use('', require('./routes/index.js'))

app.use((req, res, next) => { // middleware
    const error = new Error(' ko thay');
    error.status = 404;
    next(error);
})


app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    const code = error.code || 'error';
    return res.status(statusCode).json({
        code,
        status: statusCode,
        message: error.message || 'Internal Server Error',
        error: error.stack,
    });
});

require('./dbs/init.mongodb.js');

module.exports = app;