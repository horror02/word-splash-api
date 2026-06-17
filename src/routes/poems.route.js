'use strict';

const BaseRoute = require('./base-route');
const authenticate = require('../middlewares/authenticate');
const CreatePoemController = require('../controllers/poems/create.controller');
const UpdatePoemController = require('../controllers/poems/update.controller');
const DeletePoemController = require('../controllers/poems/delete.controller');
const PoemValidator = require('../validations/poem.validation');
const PoemMapper = require('../mappers/poem.mapper');
const GetPoemsController = require('../controllers/poems/get.controller');
const GetPoemController = require('../controllers/poems/get-one.controller');

class PoemRoute extends BaseRoute {
    load() {
        this.app.post('/v1/poem', authenticate, this.createPoem);
        this.app.put('/v1/poem/:id', authenticate, this.updatePoem);
        this.app.delete('/v1/poem/:id', authenticate, this.deletePoem);
        this.app.get('/v1/poems', this.getPoems);
        this.app.get('/v1/poem/:id', this.getPoem);
    }

    createPoem = async (req, res, next) => {
        try {
            PoemValidator.validate('create', req.body);
            const response = await CreatePoemController.perform(req);
            res.send(new PoemMapper(response));
        } catch (error) {
            next(error);
        }
    };

    updatePoem = async (req, res, next) => {
        try {
            PoemValidator.validate('update', req.body);
            const response = await UpdatePoemController.perform(req);
            res.send(new PoemMapper(response));
        } catch (error) {
            next(error);
        }
    };

    deletePoem = async (req, res, next) => {
        try {
            const response = await DeletePoemController.perform(req.params.id);
            res.send(response);
        } catch (error) {
            next(error);
        }
    };

    getPoems = async (req, res, next) => {
        try {
            const response = await GetPoemsController.perform(req.query);
            res.send(PoemMapper.paginated(response));
        } catch (error) {
            next(error);
        }
    };

    getPoem = async (req, res, next) => {
        try {
            const response = await GetPoemController.perform(req.params.id);
            res.send(new PoemMapper(response));
        } catch (error) {
            next(error);
        }
    };
}

module.exports = PoemRoute;
