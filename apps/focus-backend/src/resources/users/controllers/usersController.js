import config from 'config';
import formidable from 'formidable';
import httpStatus, { ReasonPhrases } from 'http-status-codes';
import path from 'path';
import { UPLOAD_CONFIG_SYMBOL } from '../../../common/constants.js';
import { UsersModel } from '../models/userModel.js';

export class UsersController {
    constructor() {
        this.usersModel = new UsersModel();
        this.uploadPath = config.get(UPLOAD_CONFIG_SYMBOL).path;
        this.getUser = this.getUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getUserFriends = this.getUserFriends.bind(this);
        this.addUserFriend = this.addUserFriend.bind(this);
        this.getProfilePic = this.getProfilePic.bind(this);
        this.postProfilePic = this.postProfilePic.bind(this);
    }

    async getUser(req, res, next) {
        const { userId } = req.params;
        if (!userId) {
            return res.status(httpStatus.BAD_REQUEST).json({ messages: 'userId is missing' });
        }
        try {
            const user = await this.usersModel.getUser(userId);
            return res.status(httpStatus.OK).json(user);
        } catch (err) {
            return next(err);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await this.usersModel.getUsers();
            return res.status(httpStatus.OK).json(users);
        } catch (err) {
            return next(err);
        }
    }

    async getUserFriends(req, res, next) {
        try {
            const { userId } = req.params;
            const userFriends = await this.usersModel.getUserFriends(userId);
            return res.status(httpStatus.OK).json(userFriends);
        } catch (err) {
            return next(err);
        }
    }

    async addUserFriend(req, res, next) {
        try {
            const userId = req.session.user;
            const { userId: friendId } = req.params;
            await this.usersModel.addUserFriend(userId, friendId);
            return res.status(httpStatus.CREATED).json(ReasonPhrases.CREATED);
        } catch (err) {
            return next(err);
        }
    }

    async getProfilePic(req, res, next) {
        try {
            const userId = req.session.user;
            const pathToPic = `${this.uploadPath}${userId}/profile/image`;
            const __dirname = path.resolve(pathToPic);
            return res.sendFile(__dirname);
        } catch (err) {
            return next(err);
        }
    }

    async postProfilePic(req, res, next) {
        try {
            const userId = req.session.user;
            const form = formidable({});
            form.parse(req, async (err, fields, files) => {
                if (err) next(err);
                const oldPath = files.profilePic && files.profilePic.filepath;
                if (!oldPath) {
                    return next(new VideoFileKeyError());
                }
                await this.usersModel.uploadProfilePic(userId, oldPath);
                return res.status(httpStatus.CREATED).json(ReasonPhrases.CREATED);
            });
        } catch (err) {
            return next(err);
        }
    }
}
