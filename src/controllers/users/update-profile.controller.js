'use strict';

const BaseController = require('../base-controller');
const Errors = require('../../errors');
const User = require('../../models/user.model');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

const jwtFilter = ['password', 'deletedAt', '__v'];

class UpdateProfileController extends BaseController {
    static async perform(req) {
        try {
            const userId = req.user._id;
            const { name, username, email } = req.body;

            const user = await User.findById(userId);
            if (!user || user.deletedAt) {
                throw new Errors.ResourceNotFoundError('user', userId);
            }

            if (name !== undefined) user.name = name;
            if (username !== undefined) user.username = username;
            if (email !== undefined) user.email = email;
            user.updatedAt = new Date().getTime();

            const updated = await user.save();

            const sessionData = {};
            const plain = updated.toObject();
            for (const [key, value] of Object.entries(plain)) {
                if (!jwtFilter.includes(key)) {
                    sessionData[key] = value;
                }
            }

            const token = jwt.sign(sessionData, config.encryption.jwtToken, {
                expiresIn: config.encryption.jwtExpiration,
            });

            return {
                user: {
                    _id: updated._id,
                    name: updated.name,
                    username: updated.username,
                    email: updated.email,
                    privilege: updated.privilege,
                    updatedAt: updated.updatedAt,
                },
                token,
            };
        } catch (error) {
            throw new Errors.BaseError(error);
        }
    }
}

module.exports = UpdateProfileController;
