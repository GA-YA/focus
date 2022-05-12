import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import sessions from 'express-session';
import { initDb } from './common/db/db.js';
import { errorHandler } from './common/middlewares/errors.handler.js';
import { sessionProps } from './common/middlewares/session.js';
import { swaggerServer, swaggerSetup } from './common/middlewares/swagger.js';
import apiRouterFactory from './resources/index.js';

const getApp = async () => {
    const app = express();

    await initDb();

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    app.use(sessions(sessionProps));

    apiRouterFactory(app);
    app.use('/docs', swaggerServer, swaggerSetup);
    app.use(errorHandler);

    return app;
};

export { getApp };
