var mongoose = require('mongoose');

module.exports = mongoose.model('Oder', {
    date: Date,
    userid: Number,
    username: String,
    total: Number

});