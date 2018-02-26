import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
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
        firstName: { type: String },
        lastName: { type: String }
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
    this.hashPassword(next);
});

UserSchema.post('save', function () {
    this.stripPasswordFromUser();
});

UserSchema.methods.hashPassword = function (next) {
    const user = this;
    const saltRounds = 12;

    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        return next();
    });
};

UserSchema.methods.stripPasswordFromUser = function () {
    const user = this;

    if (user && user.password) {
        user.password = undefined;
    }
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
