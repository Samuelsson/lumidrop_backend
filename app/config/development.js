// Development config
// When running application in production duplicate this file as production.js and enter your own values.

const config = {
    database: {
        url: 'mongodb://localhost:27017/lumidrop'
    },
    jwt: {
        secret: 'SUPER_SECRET'
    },
    server: {
        port: 3000
    }
};

export default config;
