const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    contactInformation: {
        firstName: { type: String },
        lastName: { type: String }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
