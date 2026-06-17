'use strict';

const BaseError = require('./base.js');

class ResourceAlreadyExistError extends BaseError {
    constructor(message = undefined) {
        return super({
            code: 'resource_already_exist',
            message: message || 'Resource already exist',
            statusCode: 409,
        })

    }
}

module.exports = ResourceAlreadyExistError;