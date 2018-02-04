const User = require('./users.model');

exports.createUser = (req, res, next) => {
    const user = new User({
        username: req.body.username
    });

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
};

exports.listAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(e => next(e));
};
