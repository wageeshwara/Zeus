var mongoose = require('mongoose');

module.exports = mongoose.model('OderProducts', {
    oderId: String,
    productId: Number,
    productName: String,
    Quantity : Number
});