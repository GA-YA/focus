import config from 'config';
import MongoDBStore from 'connect-mongo';
import { dbConnectionUrl } from '../db/db.js';

const secret = config.get('auth').sessionSecret;
const oneDay = 1000 * 60 * 60 * 24;

export const sessionProps = {
    secret,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    httpOnly: false,
    store: new MongoDBStore({
        mongoUrl: dbConnectionUrl,
        databaseName: config.get('db').dbname,
        collection: 'session',
    }),
};
