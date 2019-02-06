import defaultConfig from './default';
import developmentConfig from './development';
import productionConfig from './production';

const nodeEnv = process.env.NODE_ENV;
let envConf = {};

switch (nodeEnv) {
case 'development':
    envConf = developmentConfig;
    break;
case 'production':
    envConf = productionConfig;
    break;
default:
    envConf = {};
}

export default Object.assign(defaultConfig, envConf);
