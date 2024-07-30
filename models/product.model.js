const mongoose= require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    textcolor: String,
    bgcolor: String,
    panelcolor: String,
    discount: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Product', productSchema);