'use strict';

const BaseError = require('./base.js');

class ForbiddenError extends BaseError {
    constructor(message = undefined) {
        return super({
            code: 'forbidden_error',
            message: message || 'You dont have permission to access this resource',
            statusCode: 403,
        });
    }
}

module.exports = ForbiddenError;