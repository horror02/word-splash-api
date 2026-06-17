'use strict';

const config = require('../../../config');
const wrap = require('../response-mappers/response-helper');

class LoginResponseMapper {
    constructor(token) {
        return wrap({
            token,
            expiresIn: config.encryption.jwtExpiration,
        });
    }
}

module.exports = LoginResponseMapper;