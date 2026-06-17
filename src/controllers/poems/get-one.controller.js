'use strict';

const BaseController = require('../base-controller');
const Errors = require('../../errors');
const PoemModel = require('../../models/poem.model');

class GetPoemController extends BaseController {
    static async perform(id) {
        try {
            const poem = await PoemModel.findOne({ _id: id });
            if(!poem) {
                throw new Errors.ResourceNotFoundError('Poem does not exist')
            }

            return poem;
        } catch (error) {
            throw new Errors.BaseError(error);
        }
    }
}

module.exports = GetPoemController;
