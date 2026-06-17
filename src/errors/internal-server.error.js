'use strict';

const BaseError = require('./base.js');

class InternalServerError extends BaseError {
    constructor(message = undefined) {
        return super({
            message: message || 'Something went wrong. Rest assured, we are working on it',
        });
    }
}

module.exports = InternalServerError;