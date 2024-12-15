const {ForbiddenError, AuthFailureError} = require("../core/error.response");
const checkRole = async(req, res, next) => {
    const userRole = req.user?.role;

    if (userRole !== 'rescue') {
        return next(new ForbiddenError('You do not have permission to access this resource'));
    }
    next();
};

module.exports = {checkRole};