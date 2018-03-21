import User from './user.model';

const userController = {};

function sanitizeReturnedUser(user) {
    user.password = undefined;
    return user;
}

userController.register = (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        contactInformation: req.body.contactInformation
    });

    user.save()
        .then(savedUser => res.json(sanitizeReturnedUser(savedUser)))
        .catch(err => res.status(500).send({ message: err }));
};

export default userController;
