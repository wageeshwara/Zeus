var mongoose = require("mongoose");

module.exports = mongoose.model('User', {
    firstname: String,
    secondname: String,
    password: String,
    email: String,
    hospitlename: String,
    newsletter: Boolean,
    termsCondition: Boolean
});
