'use strict';

const BaseError = require('./base.js');

class NotImplementedError extends BaseError {
    constructor(message = undefined) {
        return super({
            code: 'not_implemented',
            message: message || 'This feature is not implemented yet',
            statusCode: 501,
        });
    }
}

module.exports = NotImplementedError;