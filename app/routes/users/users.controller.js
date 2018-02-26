const User = require('./users.model');

exports.register = (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    user.save()
        .then((savedUser) => {
            return res.json(savedUser);
        })
        .catch((err) => {
            return res.status(400).send({
                message: err
            });
        });
};
