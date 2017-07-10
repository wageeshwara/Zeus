var mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
    id: Number,
    name: String,
    price: Number,
    image: Buffer,
    quantity:Number
});