const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    source: {
        type: String,
        required: true,
    },

    link: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Internship", internshipSchema);