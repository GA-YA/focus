import { UserNotExistsError, VideoNotExistsError } from '../../../common/errors/errors.js';
import User from '../../users/models/db/schema.js';
import Comment from './db/comment.schema.js';
import Video from './db/video.schema.js';

export class CommentsModel {
    constructor() {
        this.createComment = this.createComment.bind(this);
        this.getComment = this.getComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
    }

    async createComment(fromUserId, toUserId, text, videoId) {
        const toUser = await User.findById(toUserId);
        const fromUser = await User.findById(fromUserId);
        if (!toUser) {
            throw new UserNotExistsError(toUserId);
        }

        const video = await Video.findById(videoId);
        if (!video) {
            throw new VideoNotExistsError(videoId);
        }

        const newComment = await Comment.create({
            fromUserId,
            toUserId,
            fromUserName: fromUser.userName,
            toUserName: toUser.userName,
            videoId,
            text,
            date: new Date().getTime(),
        });

        video.comments.push(newComment._id);
        await video.save();
        await newComment.save();
        return newComment;
    }

    async getComment(commentId) {
        const comment = Comment.findById(commentId);
        if (!comment) {
            throw new CommentNotFound(commentId);
        }
        return comment;
    }

    async removeComment(userId, commentId) {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return;
        }
        const { fromUserId, videoId } = comment;
        const video = await Video.findById(videoId);
        if (fromUserId.toString() === userId) {
            await comment.remove();
            const commentsAfterRemove = video.comments.reduce((prev, curr) => {
                return curr.toString() === commentId ? prev : [...prev, curr];
            }, []);
            video.comments = commentsAfterRemove;
            await video.save();
        }
    }
}
