'use strict';

const BaseController = require('../base-controller');
const Errors = require('../../errors');
const PoemModel = require('../../models/poem.model');

class UpdatePoemController extends BaseController {
    static async perform(req) {
        try {
            const { id } = req.params;
            const { title, body } = req.body;

            const poem = await PoemModel.findById(id);

            if (!poem || !poem.isActive) {
                throw new Errors.ResourceNotFoundError('poem', id);
            }

            if (title !== undefined) poem.title = title;
            if (body !== undefined) poem.body = body;
            poem.updatedAt = new Date().getTime();

            const updated = await poem.save();

            return {
                _id: updated._id,
                title: updated.title,
                body: updated.body,
                author: updated.author,
                authorId: updated.authorId,
                createdAt: updated.createdAt,
                updatedAt: updated.updatedAt,
                isActive: updated.isActive,
            };
        } catch (error) {
            throw new Errors.BaseError(error);
        }
    }
}

module.exports = UpdatePoemController;
