import User from '../user/user.model';

const authController = {};

authController.register = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        contactInformation: req.body.contactInformation
    });

    user.save()
        .then(() => res.status(200).json({ token: user.generateJwt() }))
        .catch(err => res.status(500).send({ message: err }));
};

authController.login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'We fucked up!' });
        } else if (user) {
            user.validPassword(req.body.password).then((valid) => {
                if (!valid) return res.status(401).json({ message: 'Invalid credentials.' });

                return res.status(200).json({ token: user.generateJwt() });
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
    });
};

export default authController;
