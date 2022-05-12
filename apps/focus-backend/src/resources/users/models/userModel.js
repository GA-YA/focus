import config from 'config';
import mongoose from 'mongoose';
import { UPLOAD_CONFIG_SYMBOL, USERS_CONFIG_SYMBOL } from '../../../common/constants.js';
import { NotFoundError } from '../../../common/errors/errors.js';
import { saveFileToDisk } from '../../../common/utils.js';
import User from './db/schema.js';

export class UsersModel {
    constructor() {
        this.uploadPath = config.get(UPLOAD_CONFIG_SYMBOL).path;
        this.urlPath = config.get(USERS_CONFIG_SYMBOL).profilePicPath;
    }

    async getUser(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new NotFoundError('user', userId);
            }
            return user;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async getUsers() {
        try {
            const users = await User.find();
            if (!users) {
                throw new NotFoundError('users', '');
            }
            return users;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async getUserFriends(userId) {
        try {
            const user = await User.findById(userId).exec();
            if (!user) {
                throw new NotFoundError('user', userId);
            }
            let friends = await User.find({
                _id: { $in: user.friends.map((friend) => mongoose.Types.ObjectId(friend._id)) },
            }).lean();

            friends = friends.reduce((prev, curr) => {
                const { password, friends, ...newCurr } = curr;
                return [...prev, newCurr];
            }, []);

            return friends;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async addUserFriend(userId, friendId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new NotFoundError('user', userId);
            }
            user.friends.push(friendId);
            user.save();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async uploadProfilePic(userId, oldPath) {
        try {
            const user = await User.findById(userId);
            const newPath = `${this.uploadPath}${userId}/profile`;
            const fileUrl = `${this.urlPath}/${userId}`;

            user.photo = fileUrl;
            saveFileToDisk(oldPath, newPath, 'image');
            user.save();
        } catch (e) {
            throw e;
        }
    }
}
