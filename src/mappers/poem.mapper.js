'use strict';

class PoemMapper {
    constructor(params) {
        this._id = params._id;
        this.title = params.title;
        this.body = params.body;
        this.author = params.author;
        this.authorId = params.authorId;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.isActive = params.isActive;

        this.__v = params.__v;

        return this.object();
    }

    object() {
        return {
            _id: this._id,
            title: this.title,
            body: this.body,
            author: this.author,
            authorId: this.authorId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            isActive: this.isActive,
        };
    }

    metadata() {
        return {
            __v: this.__v,
        };
    }

    static paginated(result) {
        const { data, meta } = result;

        return {
            data: data.map((poem) => new PoemMapper(poem)),
            meta: {
                total: meta.total,
                pageSize: meta.pageSize,
                offsetValue: meta.offsetValue,
                totalPages: meta.totalPages,
                currentPage: meta.currentPage,
            },
        };
    }
}

module.exports = PoemMapper;
