export class MissingRequiredInputError extends Error {
    constructor() {
        super('missing required input');
    }
}

export class AlreadyExistsError extends Error {
    constructor(resourse) {
        super(`${resourse} Already exists`);
    }
}

export class AuthorizationError extends Error {
    constructor() {
        super('invalid Credentials');
    }
}

export class FileCouldNotSaved extends Error {
    constructor() {
        super('file could not be saved');
    }
}

export class UserNotExistsError extends Error {
    constructor(userId) {
        super(`user ${userId} is not exists`);
    }
}

export class VideoNotExistsError extends Error {
    constructor(videoId) {
        super(`video ${videoId} is not exists`);
    }
}

export class CommentNotFound extends Error {
    constructor(commentId) {
        super(`comment ${commentId} is not exists`);
    }
}

export class VideoFileKeyError extends Error {
    constructor() {
        super(`video form key should named video`);
    }
}
export class MongooseError extends Error {
    constructor(message) {
        super(message);
    }
}

export class NotFoundError extends Error {
    constructor(resource, resourceId) {
        super(`${resource} ${resourceId} not found`);
    }
}
