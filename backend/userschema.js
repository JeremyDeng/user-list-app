const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    password: {
        type: String
    },
    repeatpassword: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);