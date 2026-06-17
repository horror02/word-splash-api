'use strict';

class BaseError extends Error {
    constructor(state) {
        const { code, message, statusCode, details = {} } = state;

        super(message);

        this.message = message || 'Internal Server Error';
        this.code = code || details.code || 'Internal_server_error';
        this.statusCode = statusCode || 500;

        return this.response();
    }

    response() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            details: {
                code: this.code,
            },
        };
    }
}

module.exports = BaseError;