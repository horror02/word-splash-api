'use strict';

require('dotenv').config();

const {
    PORT,
    CORS_ORIGIN,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_BASIC_AUTH,
    DB_USER,
    DB_PASSWORD,
    DB_CLUSTER,
    JWT_TOKEN,
    NODE_ENV,
} = process.env;

const dbAuth = () => {
    if (DB_USER && DB_PASSWORD) {
        return `${DB_USER}:${DB_PASSWORD}@`;
    }

    return '';
};
module.exports = {
    port: PORT || 30000,
    database: {
        host: DB_HOST,
        port: parseInt(DB_PORT) || 27017,
        name: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        basicAuth: DB_BASIC_AUTH,
        connectionString: `mongodb://${dbAuth()}${DB_HOST}:${DB_PORT}/${DB_NAME}` || `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.slofrci.mongodb.net/`,
    },
    encryption: {
        saltRounds: 10,
        jwtExpiration: '24h',
        jwtToken: JWT_TOKEN,
    },
    cors: CORS_ORIGIN ? CORS_ORIGIN.split(',') : [],
    env: NODE_ENV || 'development',
}
