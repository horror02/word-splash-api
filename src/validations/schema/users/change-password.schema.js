'use strict';

module.exports = {
    type: 'object',
    properties: {
        currentPassword: { type: 'string' },
        newPassword: { type: 'string', minLength: 6 },
    },
    required: ['currentPassword', 'newPassword'],
    additionalProperties: false,
};
