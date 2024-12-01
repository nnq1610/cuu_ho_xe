const jwt = require('jsonwebtoken');
const {AuthFailureError} = require("../core/error.response");

const checkJWT = async(req, res, next) => {

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
}

module.exports = {checkJWT};