const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    picture: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'

        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'

        }
    ]
});

module.exports = mongoose.model('User', userSchema);