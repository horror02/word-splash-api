'use strict';

const BaseError = require('./base.js');

class ResourceNotFoundError extends BaseError {
    constructor(message = undefined) {
        return super({
            code: 'resource_not_found',
            message: message || 'Resource not found',
            statusCode: 404,
        });
    }
}

module.exports = ResourceNotFoundError;