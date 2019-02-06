const config = {
    database: { url: 'mongodb://localhost:27017/lumidrop' },
    jwt: {
        secret: 'SUPER_SECRET_FOR_DEV',
        expireTime: '1h'
    },
    server: { port: 3000 }
};

export default config;
