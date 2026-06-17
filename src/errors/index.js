'use strict';

const AuthenticationFailureError = require("./authentication-failure.error");
const BadRequestError = require("./bad-request.error");
const BaseError = require("./base");
const ForbiddenError = require("./forbidden-error");
const InternalServerError = require("./internal-server.error");
const NotImplementedError = require("./not-implemented.error");
const ResourceAlreadyExistError = require("./resource-already-exist.error");
const ResourceNotFoundError = require("./resource-not-found.error");
const SchemaNotFoundError = require("./schema-not-found.error");

module.exports = {
    AuthenticationFailureError,
    BadRequestError,
    ForbiddenError,
    NotImplementedError,
    InternalServerError,
    ResourceAlreadyExistError,
    ResourceNotFoundError,
    SchemaNotFoundError,
    BaseError
}