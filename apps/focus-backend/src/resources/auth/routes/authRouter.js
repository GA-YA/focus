import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

const authRouterFactory = () => {
    const router = Router();
    const controller = new AuthController();

    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.post('/logout', controller.logout);

    return router;
};

export { authRouterFactory };
