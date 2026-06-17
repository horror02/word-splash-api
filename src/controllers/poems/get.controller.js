'use strict';

const BaseController = require('../base-controller');
const Errors = require('../../errors');
const PoemModel = require('../../models/poem.model');

class GetPoemsController extends BaseController {
    static async perform(params = {}) {
        try {
            const {
                sortBy = 'desc',
                sortColumn = 'createdAt',
                pageSize = 10,
                offsetValue = 0,
                search
            } = params;

            const filter = { isActive: true };

            if (search) {
                filter.title = { $regex: search, $options: 'i' };
            }

            const sortOrder = sortBy.toLowerCase() === 'asc' ? 1 : -1;
            const sort = { [sortColumn]: sortOrder };

            const limit = parseInt(pageSize);
            const skip = parseInt(offsetValue);

            const [poems, total] = await Promise.all([
                PoemModel.find(filter)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                PoemModel.countDocuments(filter),
            ]);

            return {
                data: poems,
                meta: {
                    total,
                    pageSize: limit,
                    offsetValue: skip,
                    totalPages: Math.ceil(total / limit),
                    currentPage: Math.floor(skip / limit) + 1,
                },
            };
        } catch (error) {
            throw new Errors.BaseError(error);
        }
    }
}

module.exports = GetPoemsController;
