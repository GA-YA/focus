import httpStatus from 'http-status-codes';
import { MissingRequiredInputError } from '../../../common/errors/errors.js';
import { AuthModel } from '../models/authModel.js';

export class AuthController {
    constructor() {
        this.authModel = new AuthModel();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async register(req, res) {
        const { userName, firstName, lastName, password, email, birth } = req.body;
        try {
            if (!(userName && email && password && firstName && lastName && birth)) {
                throw new MissingRequiredInputError();
            }
            const user = await this.authModel.register(req.body);
            req.session.user = user._id;
            req.session.save();
            res.status(httpStatus.CREATED).json(user);
        } catch (err) {
            return next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                throw new MissingRequiredInputError();
            }
            const user = await this.authModel.login(req.body);
            req.session.user = user._id;
            req.session.save();
            res.status(httpStatus.OK).json(user);
        } catch (err) {
            return next(err);
        }
    }

    async logout(req, res, next) {
        try {
            req.session.destroy();
            res.status(httpStatus.OK).json(httpStatus.OK);
        } catch (err) {
            return next(err);
        }
    }
}
