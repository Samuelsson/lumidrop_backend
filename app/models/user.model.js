import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    timestamps: true
});

UserSchema.pre('save', function (next) {
    this.hashPassword(next);
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

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
