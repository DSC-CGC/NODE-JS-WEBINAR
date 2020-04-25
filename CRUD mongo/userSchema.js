var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    username: { type: String, required: [true, 'username is required'], unique: true },
    email: { type: String, required: [true, 'Email ID is required'], unique: true },
    phone: { type: Number, required: [true, 'Phone Number is required'], unique: true },
    password: { type: String }
});

var User = mongoose.model('user', schema);

module.exports = User;