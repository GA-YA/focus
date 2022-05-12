import auth from '../common/middlewares/auth.js';
import { authRouterFactory } from './auth/routes/authRouter.js';
import { usersRouterFactory } from './users/routes/usersRouter.js';
import { videosRouterFactory } from './videos/routes/videoRouter.js';

const apiRouterFactory = (app) => {
    const authRouter = authRouterFactory();
    const usersRouter = usersRouterFactory();
    const videosRouter = videosRouterFactory();

    app.use('/api', authRouter);
    app.use('/api', auth, usersRouter, videosRouter);
};

export default apiRouterFactory;
