import jwt from 'jsonwebtoken';
import User from '../user/user.model';

const authController = {};
const privateKey = 'THIS_SECRET_IS_GOING_IN_ENV_CONF_LATER';

authController.login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'We fucked up!' });
        } else if (user) {
            user.validPassword(req.body.password).then((valid) => {
                if (!valid) return res.status(401).json({ message: 'Invalid credentials.' });

                const jwtBearerToken = jwt.sign({
                    username: user.username,
                    id: user.id
                }, privateKey, { expiresIn: 120 });

                return res.json({
                    token: jwtBearerToken,
                    message: 'Successfully logged in.'
                });
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
    });
};

export default authController;
