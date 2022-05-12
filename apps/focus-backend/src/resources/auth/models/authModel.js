import bcrypt from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import { AlreadyExistsError, AuthorizationError } from '../../../common/errors/errors.js';
import User from '../../users/models/db/schema.js';

export class AuthModel {
    constructor() {
        this.tokenKey = config.get('auth').tokenKey;
    }

    async register({ userName, firstName, lastName, password, email, birth, photo }) {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            throw new AlreadyExistsError('User');
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            firstName,
            lastName,
            birth,
            photo: photo || null,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        const token = jwt.sign({ user_id: user._id, email }, this.tokenKey, {
            expiresIn: '2h',
        });
        user.token = `Bearer ${token}`;
        return user;
    }

    async login({ email, password }) {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email }, this.tokenKey, {
                expiresIn: '2h',
            });
            user.token = `Bearer ${token}`;
            return user;
        }
        throw new AuthorizationError();
    }
}
