const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    fileName: String,
    filePath: String,
    extractedText: String,

    summary: {
        type: String,
        default: ""
    },

    quiz: {
        type: Array,
        default: []
    },

    flashcards: {
        type: Array,
        default: []
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Note", noteSchema);