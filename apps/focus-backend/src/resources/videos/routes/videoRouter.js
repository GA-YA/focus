import { Router } from 'express';
import { VideosController } from '../controller/videosController.js';

const videosRouterFactory = () => {
    const router = Router();
    const controller = new VideosController();

    router.get('/videos/all/:userId', controller.getUserVideos);

    router.get('/videos/:videoId', controller.getVideo);
    router.post('/videos', controller.postVideo);
    router.delete('/videos/:videoId', controller.deleteVideo);

    router.get('/videos/comments/:commentId', controller.getVideoComment);
    router.post('/videos/comments/:videoId', controller.postVideoComment);
    router.delete('/videos/comments/:commentId', controller.deleteVideoComment);

    router.post('/videos/likes/:videoId', controller.postLike);
    router.delete('/videos/likes/:videoId', controller.deleteLike);

    router.get('/videos/stream/:userId/:videoId', controller.streamVideo);
    return router;
};

export { videosRouterFactory };
