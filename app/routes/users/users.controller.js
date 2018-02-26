const User = require('./users.model');

// Could this be put in mongoose methods or similar?
function stripPasswordFromUser(user) {
    if (user && user.password) {
        const userWithNoPassword = user;
        userWithNoPassword.password = undefined;
        return userWithNoPassword;
    }
    return user;
}

exports.register = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    user.save()
        .then((savedUser) => {
            const returnedUser = stripPasswordFromUser(savedUser);
            return res.json(returnedUser);
        })
        .catch(e => next(e));
        // .catch((e) => {
        //     return res.status(400).send({
        //         message: 'fel lixom'
        //     });
        // });
};

exports.listAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(e => next(e));
};
