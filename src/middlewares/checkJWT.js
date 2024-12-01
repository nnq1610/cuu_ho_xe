const jwt = require('jsonwebtoken');
const {AuthFailureError} = require("../core/error.response");

const checkJWT = async(req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            throw new AuthFailureError('Bạn không có quyền truy cập')
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                throw new AuthFailureError('Bạn không có quyền truy cập');
            }
            req.userId = user.userId;
            next();
        });
        } catch(error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new AuthFailureError('Token không hợp lệ'));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new AuthFailureError('Token đã hết hạn'));
        }
        next(error);
    }
}

module.exports = {checkJWT};