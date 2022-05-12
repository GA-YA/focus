import config from 'config';
import mongoose from 'mongoose';

const dbConf = config.get('db');
let uri = dbConf.uri;
const username = dbConf.username;
const password = dbConf.password;

const dbName = dbConf.dbname;

uri = uri.replace('<password>', password);
uri = uri.replace('<username>', username);
uri = uri.replace('<dbName>', dbName);

export const dbConnectionUrl = uri;

export async function initDb() {
    mongoose.Promise = global.Promise;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('error', (err) => {
        console.error(err.message);
        process.exit();
    });
}
