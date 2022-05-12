import config from 'config';
import { getApp } from './app.js';
import { DEFAULT_SERVER_PORT } from './common/constants.js';

const serverConf = config.get('server');
const port = serverConf.port || DEFAULT_SERVER_PORT;

const app = await getApp();

app.listen(port, () => {
    console.log(`app started on port ${port}`);
});
