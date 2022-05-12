import config from 'config';
import formidable from 'formidable';
import fs from 'fs';
import httpStatus, { ReasonPhrases } from 'http-status-codes';
import { UPLOAD_CONFIG_SYMBOL } from '../../../common/constants.js';
import { VideoFileKeyError } from '../../../common/errors/errors.js';
import { CommentsModel } from '../models/commentsModel.js';
import { VideosModel } from '../models/videoModel.js';

export class VideosController {
    constructor() {
        this.videosModel = new VideosModel();
        this.commentsModel = new CommentsModel();
        this.uploadPath = config.get(UPLOAD_CONFIG_SYMBOL).path;
        this.getUserVideos = this.getUserVideos.bind(this);
        this.postVideo = this.postVideo.bind(this);
        this.getVideo = this.getVideo.bind(this);
        this.deleteVideo = this.deleteVideo.bind(this);
        this.streamVideo = this.streamVideo.bind(this);
        this.postVideoComment = this.postVideoComment.bind(this);
        this.getVideoComment = this.getVideoComment.bind(this);
        this.deleteVideoComment = this.deleteVideoComment.bind(this);
        this.postLike = this.postLike.bind(this);
        this.deleteLike = this.deleteLike.bind(this);
    }

    async getUserVideos(req, res, next) {
        const { userId } = req.params;
        if (!userId) {
            return res.status(httpStatus.BAD_REQUEST).json({ messages: 'userId is missing' });
        }
        try {
            const videos = await this.videosModel.getVideos(userId);
            return res.status(httpStatus.OK).json(videos);
        } catch (err) {
            return next(err);
        }
    }

    async getVideo(req, res, next) {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(httpStatus.BAD_REQUEST).json({ messages: 'videoId is missing' });
        }
        try {
            const video = await this.videosModel.getVideo(videoId);
            return res.status(httpStatus.OK).json(video);
        } catch (err) {
            return next(err);
        }
    }

    async postVideo(req, res, next) {
        const form = formidable({});
        const userId = req.session.user;
        let oldPath;
        form.parse(req, async (err, fields, files) => {
            if (err) next(err);
            oldPath = files.video && files.video.filepath;
            const { description } = fields;
            if (!oldPath) {
                return next(new VideoFileKeyError());
            }
            try {
                await this.videosModel.uploadVideo(userId, oldPath, description);
                return res.status(httpStatus.CREATED).json({ message: ReasonPhrases.CREATED });
            } catch (err) {
                return next(err);
            }
        });
    }

    async deleteVideo(req, res, next) {
        const { userId } = req.session;
        const { videoId } = req.params;
        try {
            await this.videosModel.deleteVideo(userId, videoId);
            return res.status(httpStatus.OK).json({ message: ReasonPhrases.OK });
        } catch (err) {
            return next(err);
        }
    }

    async streamVideo(req, res, next) {
        let range = req.headers.range;
        const { userId, videoId } = req.params;
        if (!range) {
            range = 'bytes=0';
        }
        try {
            //TODO: fix not exists directory
            const videoPath = `${this.uploadPath}${userId}/${videoId}`;
            const videoSize = fs.statSync(videoPath).size;
            const CHUNK_SIZE = 10 ** 6;
            const start = Number(range.replace(/\D/g, ''));
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
            const contentLength = end - start + 1;
            const headers = {
                'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': contentLength,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, headers);
            const videoStream = fs.createReadStream(videoPath, { start, end });
            await videoStream.pipe(res);
        } catch (err) {
            return next(err);
        }
    }

    async postVideoComment(req, res, next) {
        const { user: userId } = req.session;
        const { videoId } = req.params;
        const { toUserId, text } = req.body;

        try {
            const comment = await this.commentsModel.createComment(userId, toUserId, text, videoId);
            res.status(httpStatus.CREATED).json(comment);
        } catch (err) {
            next(err);
        }
    }

    async getVideoComment(req, res, next) {
        const { commentId } = req.params;

        try {
            const comment = await this.commentsModel.getComment(commentId);
            res.status(httpStatus.OK).json(comment);
        } catch (err) {
            next(err);
        }
    }

    async deleteVideoComment(req, res, next) {
        const { user: userId } = req.session;
        const { commentId } = req.params;

        try {
            await this.commentsModel.removeComment(userId, commentId);
            res.status(httpStatus.OK).json({ message: ReasonPhrases.OK });
        } catch (err) {
            next(err);
        }
    }

    async postLike(req, res, next) {
        const { user: userId } = req.session;
        const { videoId } = req.params;

        try {
            await this.videosModel.addLike(userId, videoId);
            res.status(httpStatus.OK).json({ message: ReasonPhrases.OK });
        } catch (err) {
            next(err);
        }
    }

    async deleteLike(req, res, next) {
        const { user: userId } = req.session;
        const { videoId } = req.params;

        try {
            await this.videosModel.removeLike(userId, videoId);
            res.status(httpStatus.OK).json({ message: ReasonPhrases.OK });
        } catch (err) {
            next(err);
        }
    }
}
