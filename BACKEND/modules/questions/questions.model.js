const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsData = new Schema({
    questions: {
        type: String,
        unique: true,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    subcatagoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCatagory"
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

let QUESTIONS = mongoose.model('questions', questionsData)
module.exports = QUESTIONS