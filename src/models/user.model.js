'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    privilege: {
        enum: ['admin', 'user'],
        type: String,
        lowercase: true,
    },
    isActive: {
        default: true,
        type: Boolean,
    },
    deletedAt: {
        type: Number,
    },
    createdAt: {
        type: Number,
        default: new Date().getTime(),
    },
    updatedAt: {
        type: Number,
        default: new Date().getTime(),
    },
});

module.exports = model('User', schema);
