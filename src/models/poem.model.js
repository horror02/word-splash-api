'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    author: {
        type: String,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Number,
        default: new Date().getTime(),
    },
    updatedAt: {
        type: Number,
        default: new Date().getTime(),  
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('Poem', schema);