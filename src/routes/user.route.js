'use strict';

const LoginController = require('../controllers/users/login.controller');
const UpdateProfileController = require('../controllers/users/update-profile.controller');
const ChangePasswordController = require('../controllers/users/change-password.controller');
const LoginResponseMapper = require('../mappers/response-mappers/login-response-mapper');
const UserValidator = require('../validations/user.validation');
const authenticate = require('../middlewares/authenticate');
const BaseRoute = require('./base-route');

class UserRoute extends BaseRoute {
    load() {
        this.app.post('/v1/user/login', this.login);
        this.app.put('/v1/user/profile', authenticate, this.updateProfile);
        this.app.put('/v1/user/password', authenticate, this.changePassword);
    }

    login = async (req, res, next) => {
        const { username, password } = req.body;
        try {
            UserValidator.validate('login', req.body);
            const token = await LoginController.perform(username, password);
            res.send(new LoginResponseMapper(token));
        } catch (error) {
            next(error);
        }
    };

    updateProfile = async (req, res, next) => {
        try {
            UserValidator.validate('update', req.body);
            const response = await UpdateProfileController.perform(req);
            res.send(response);
        } catch (error) {
            next(error);
        }
    };

    changePassword = async (req, res, next) => {
        try {
            const response = await ChangePasswordController.perform(req);
            res.send(response);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = UserRoute;
