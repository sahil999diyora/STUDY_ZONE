const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catagoryData = new Schema({
    catagoryName: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ["on", "off"],
        default: "on"
    },
    categoryImage: [{
        type: String,
        required: true
    }],
    alternamtiveImage: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    metaTitle: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});
let CATAGORY = mongoose.model('catagory', catagoryData)
module.exports = CATAGORY