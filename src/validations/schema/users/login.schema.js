'use strict';

module.exports = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
    additionalProperties: false,
    required: ['username', 'password'],
}