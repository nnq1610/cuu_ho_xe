require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const {default : helmet} = require('helmet');
const compression = require('compression');
const cors = require('cors');
const app = express();
const path = require('path');

const routes = require('./routes');
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))
//init route
// Cấu hình chính xác CORS
app.use(cors({
    origin: 'http://localhost:3000', // URL frontend (React) của bạn
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
    allowedHeaders: ['Content-Type', 'Authorization','x-access-token', 'x-user-id'], // Các headers cho phép
    credentials: true // Cho phép gửi cookie và xác thực giữa các domain
}));
app.use('', require('./routes/index.js'))
app.use(express.static(path.join(__dirname, '../build')));

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