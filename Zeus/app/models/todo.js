var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: String,
    password: String,
    done: Boolean
});