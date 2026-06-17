'use strict';

const BaseController = require('../base-controller.js');
const Errors = require('../../errors');
const User = require('../../models/user.model.js');
const UserMapper = require('../../mappers/user.mapper.js');

const bcrypt = require('bcrypt');
const config = require('../../../config.js');
const jwt = require('jsonwebtoken');

const mappingFilter = ['createdAt', 'password', 'updatedAt'];

class LoginController extends BaseController {
    static async perform(email, password) {
        try {
            const user = new UserMapper(
                await User.findOne({ email, deletedAt: undefined })
            );

            if(!user) {
                throw new Errors.ResourceNotFoundError('user', email);
            }

            const result = await bcrypt.compare(password, user.password);

            if(!result) {
                throw new Errors.AuthenticationFailureError();
            }

            const sessionData = {};

            for (const [key, _] of Object.entries(user)) {
                if(!mappingFilter.includes(key)) {
                    sessionData[key] = user[key];
                }
            }

            return jwt.sign(sessionData, config.encryption.jwtToken, {
                expiresIn: config.encryption.jwtExpiration,
            });

        } catch(error) {
            throw new Errors.BaseError(error);
        }
    }
}

module.exports = LoginController;