import config from 'config';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerConf = config.get('openapiConfig');
const swaggerDocument = YAML.load(swaggerConf.filePath);

export const swaggerServer = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerDocument);
