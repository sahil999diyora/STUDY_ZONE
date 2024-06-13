const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminData = new Schema({
    email: {
        type: String,
        unique: [true, "Email is Already Use.Please Enter New Email Address."],
    },
    password: {
        type: String
    }
});

let ADMIN = mongoose.model('admin',AdminData)
module.exports = ADMIN