'use strict'


const {
    StatusCodes,
    ReasonPhrases
} = require('../utils/statusCode.js');

class ErrorResponse extends Error{

    constructor(message, status){
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse{

    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT){
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse{

    constructor(message = "Bad request", statusCode = 404){
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse{

    constructor(message = "Unauthorize", statusCode = 401){
        super(message, statusCode);
    }
}

class NotFoundError extends ErrorResponse{

    constructor(message = 'Not found', statusCode = 404){
        super(message, statusCode);
    }
}

class ForbiddenError extends ErrorResponse{

    constructor(message = 'Foridden', statusCode = 403){
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError,
    ForbiddenError
}