"user strict";

const BaseController = require("../base-controller");
const Errors = require("../../errors");
const PoemModel = require("../../models/poem.model");

class CreatePoemController extends BaseController {
    static async perform(req) {
        try {
            const { title, body } = req.body;
            const userId = req.user._id;
            const authorName = req.user.name;

            if (!title || !body) {
                throw new Errors.BadRequestError(
                    "Title and content are required to create a poem."
                );
            }

            const newPoem = new PoemModel({
                title: title,
                body: body,
                authorId: userId,
                author: authorName,
            });

            const savedPoem = await newPoem.save();

            return {
                id: savedPoem._id,
                title: savedPoem.title,
                body: savedPoem.body,
                authorId: savedPoem.authorId,
                author: savedPoem.author,
                createdAt: savedPoem.createdAt,
                updatedAt: savedPoem.updatedAt
            };
        } catch (error) {
            throw new Errors.BaseError(error);
        }
    }
}

module.exports = CreatePoemController;
