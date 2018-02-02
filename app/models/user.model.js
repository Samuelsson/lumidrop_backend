const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({ username: String }, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
