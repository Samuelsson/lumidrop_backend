// Todo: Move and rename this module to something more fitting

import jwt from 'jsonwebtoken';
import env from '../environments';

function verifyJwt(req, res, next) {
    const auth = req.headers.authorization;
    const token = auth && auth.split('Bearer ')[1];

    if (!token) {
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, env.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }

        // If authenticated we add desired properties to req object
        req.userId = decoded.id;
        next();
    });
}
module.exports = verifyJwt;
