import config from 'config';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UPLOAD_CONFIG_SYMBOL, VIDEOS_CONFIG_SYMBOL } from '../../../common/constants.js';
import { MongooseError, NotFoundError } from '../../../common/errors/errors.js';
import { saveFileToDisk } from '../../../common/utils.js';
import User from '../../users/models/db/schema.js';
import Video from './db/video.schema.js';

export class VideosModel {
    constructor() {
        this.urlPath = config.get(VIDEOS_CONFIG_SYMBOL).urlBase;
        this.uploadPath = config.get(UPLOAD_CONFIG_SYMBOL).path;
        this.getVideo = this.getVideo.bind(this);
        this.getVideos = this.getVideos.bind(this);
        this.uploadVideo = this.uploadVideo.bind(this);
        this.deleteVideo = this.deleteVideo.bind(this);
    }

    async getVideos(userId) {
        try {
            const videos = await Video.find({ userId: userId }).exec();
            if (videos === null) {
                throw new Error('videos not found');
            }
            return videos;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async getVideo(videoId) {
        try {
            const video = await Video.findById(videoId).exec();
            if (video === null) {
                throw new Error('video not found');
            }
            return video;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async uploadVideo(userId, oldpath, description) {
        try {
            const session = await mongoose.connection.startSession();
            const user = await User.findById(userId);
            const uuid = uuidv4();
            const newpath = `${this.uploadPath}${userId}`;
            const fileUrl = this.urlPath + userId + '/' + uuid;

            await session.withTransaction(async () => {
                const newVid = await Video.create({
                    url: fileUrl,
                    userId,
                    description: description ? description : null,
                    date: new Date().getTime(),
                });
                user.videos.push(newVid.id);
                user.save();
            });
            saveFileToDisk(oldpath, newpath, uuid);
        } catch (e) {
            throw e;
        }
    }

    async deleteVideo(userId, videoId) {
        try {
            const video = await Video.findById(videoId);
            const user = await User.findById(userId);
            if (video && video.userId.toString() === userId) {
                await video.remove();
                const videosAfterDelete = user.videos.reduce((prev, curr) => {
                    return curr.toString() === videoId ? prev : [...prev, curr];
                }, []);
                user.videos = videosAfterDelete;
                user.save();
            }
        } catch (err) {
            throw new MongooseError(err.message);
        }
    }

    async addLike(userId, videoId) {
        try {
            const video = await Video.findById(videoId);
            if (!video) {
                throw new NotFoundError('video', videoId);
            }
            if (!video.likes.includes(userId)) {
                video.likes.push(userId);
                video.save();
            }
        } catch (err) {
            throw new MongooseError(err.message);
        }
    }

    async removeLike(userId, videoId) {
        try {
            const video = await Video.findById(videoId);
            if (!video) {
                throw new NotFoundError('video', videoId);
            }
            if (video.likes.includes(userId)) {
                const [userId, ...likesAfterRemove] = video.likes;
                video.likes = likesAfterRemove;
                video.save();
            }
        } catch (err) {
            throw new MongooseError(err.message);
        }
    }
}
