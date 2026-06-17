'use strict';

class UserMapper {
    constructor(params) {
        this._id = params._id;
        this.username = params.username;
        this.email = params.email;
        this.password = params.password;
        this.name = params.name;
        this.privilege = params.privilege;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.isActive = params.isActive;
        this.deletedAt = params.deletedAt;

        this.__v = params.__v;

        return this.object();
    }

    isDeleted() {
        return !!this.deletedAt;
    }

    object() {
        return {
            _id: this._id,
            username: this.username,
            email: this.email,
            privilege: this.privilege,
            name: this.name,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            isActive: this.isActive,
            deletedAt: this.deletedAt,
            password: this.password,
        }
    }

    metadata() {
        return {
            __v: this.__v,
        };
    }
}

module.exports = UserMapper;
