import httpStatus, { ReasonPhrases } from 'http-status-codes';
import {
    AlreadyExistsError,
    AuthorizationError,
    MissingRequiredInputError,
    NotFoundError,
    UserNotExistsError,
    VideoFileKeyError,
    VideoNotExistsError,
} from '../errors/errors.js';

const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (
        err instanceof MissingRequiredInputError ||
        err instanceof AuthorizationError ||
        err instanceof AlreadyExistsError ||
        err instanceof VideoFileKeyError
    ) {
        res.status(httpStatus.BAD_REQUEST).json({ message: err.message });
    } else if (
        err instanceof UserNotExistsError ||
        err instanceof VideoNotExistsError ||
        err instanceof NotFoundError
    ) {
        res.status(httpStatus.NOT_FOUND).json({ message: err.message });
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

export { errorHandler };
