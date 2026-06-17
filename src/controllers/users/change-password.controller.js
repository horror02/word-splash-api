'use strict';

const BaseController = require('../base-controller');
const Errors = require('../../errors');
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

class ChangePasswordController extends BaseController {
    static async perform(req) {
        try {
            const userId = req.user._id;
            const { currentPassword, newPassword } = req.body;

            const user = await User.findById(userId);
            if (!user || user.deletedAt) {
                throw new Errors.ResourceNotFoundError('user', userId);
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                throw new Errors.AuthenticationFailureError('Current password is incorrect');
            }

            user.password = await bcrypt.hash(newPassword, 10);
            user.updatedAt = new Date().getTime();
            await user.save();

            return { message: 'Password changed successfully' };
        } catch (error) {
            throw new Errors.BaseError(error);
        }
    }
}

module.exports = ChangePasswordController;
