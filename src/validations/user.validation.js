'use strict';

const BaseValidator = require('./base');
const Errors = require('./../errors');
const Ajv = require('ajv');

const ajv = new Ajv();

const VALID_SCHEMA = ['login', 'create', 'update'];

class UserValidator extends BaseValidator {
    static validate(schema, data) {
        if(!VALID_SCHEMA.includes(schema)) {
            throw new Errors.SchemaNotFoundError(
                `User schema ${schema}.schema cannot be found`
            );
        }

        const _schema = require(`./schema/users/${schema}.schema`);

        const valid = ajv.validate(_schema, data);

        if(!valid) {
            throw new Errors.BadRequestError(ajv.errors[0].message);
        }

        return true;
    }
}

module.exports = UserValidator;