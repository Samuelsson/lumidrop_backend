module.exports = (router) => {
    router.get('/users', (req, res) => {
        res.send('Hello from GET users');
    });

    router.post('/users', (req, res, next) => {
        res.send('POST');
    });
};
