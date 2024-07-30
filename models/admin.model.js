const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    picture: String
});

module.exports = mongoose.model('Admin', adminSchema);