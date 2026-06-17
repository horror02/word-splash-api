"use strict";

const User = require("../models/user.model.js");
const config = require("../../config.js");
const UserMapper = require("../mappers/user.mapper.js");
const jwt = require("jsonwebtoken");
const AuthenticationFailureError = require("../errors/authentication-failure.error");

async function findUser(userId) {
    try {
        const rawUser = await User.findById(userId);
        if (!rawUser) return null;

        const user = new UserMapper(rawUser);
        if (user.isDeleted) return null;

        return user;
    } catch (_error) {
        return null;
    }
}

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            throw new AuthenticationFailureError(
                "Missing Authorization header"
            );

        const [, token] = authHeader.split(" ");
        if (!token)
            throw new AuthenticationFailureError(
                "Invalid Authorization format"
            );

        const decoded = jwt.verify(token, config.encryption.jwtToken);
        const user = await findUser(decoded._id);
        if (!user) throw new AuthenticationFailureError("User not found");

        req.user = user;
        next();
    } catch (err) {
        const error =
            err instanceof AuthenticationFailureError
                ? err
                : new AuthenticationFailureError();
        res.status(error.statusCode).json({ message: err.message });
    }
};
