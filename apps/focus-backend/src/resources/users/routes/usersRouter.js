import { Router } from 'express';
import { UsersController } from '../controllers/usersController.js';

const usersRouterFactory = () => {
    const router = Router();
    const controller = new UsersController();

    router.get('/users', controller.getUsers);
    router.get('/users/:userId', controller.getUser);

    router.get('/users/user/friends/:userId', controller.getUserFriends);
    router.post('/users/user/friends/:userId', controller.addUserFriend);

    router.post('/users/picture', controller.postProfilePic);
    router.get('/users/picture/:userId', controller.getProfilePic);

    return router;
};

export { usersRouterFactory };
