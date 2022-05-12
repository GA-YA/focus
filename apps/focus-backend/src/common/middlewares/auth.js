import config from 'config';
import httpStatus, { ReasonPhrases } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const authConfig = config.get('auth');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.replace('Bearer ', '');
    const loggedUser = req.session.user;
    if (loggedUser) {
        return next();
    }
    if (!(token || loggedUser)) {
        return res.status(httpStatus.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    }
    try {
        const decoded = jwt.verify(token, authConfig.tokenKey);
        req.user = decoded;
    } catch (err) {
        return res.status(httpStatus.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    }
    return next();
};

export default verifyToken;
