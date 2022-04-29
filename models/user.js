const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// adds a password field to UserSchema, makes sure usernames are unique, and gives methods to use
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
