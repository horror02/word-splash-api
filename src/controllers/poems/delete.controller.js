'use strict';

const BaseController = require('../base-controller');
const Errors = require('../../errors');
const PoemModel = require('../../models/poem.model');

class DeletePoemController extends BaseController {
    static async perform(id) {
        try {
            const poem = await PoemModel.findById(id);

            if (!poem || !poem.isActive) {
                throw new Errors.ResourceNotFoundError('poem', id);
            }

            poem.isActive = false;
            poem.updatedAt = new Date().getTime();
            await poem.save();

            return { message: 'Poem deleted successfully' };
        } catch (error) {
            throw new Errors.BaseError(error);
        }
    }
}

module.exports = DeletePoemController;
