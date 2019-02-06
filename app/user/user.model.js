import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import env from '../environments';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    contactInformation: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    this.hashPassword(next);
});

UserSchema.methods.hashPassword = function (next) {
    const user = this;
    const saltRounds = 12;

    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        return next();
    });
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateJwt = function () {
    const privateKey = env.jwt.secret;

    return jwt.sign({
        id: this.id,
        roles: ['admin'],
        name: `${this.contactInformation.firstName} ${this.contactInformation.lastName}`
    }, privateKey, { expiresIn: env.jwt.expireTime });
};

const User = mongoose.model('User', UserSchema);

export default User;
