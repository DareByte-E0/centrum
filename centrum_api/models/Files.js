const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },

    originalName: {
        type: String,
        required: true,
    },

    thumbnailPath: {
        type: String,
    },

    type: {
        type: String,
        required: true,
    },

    title: {
        type: String,
    },

    description: {
        type: String,
    },
    
}, { timestamps: true });

const File = mongoose.model("File", fileSchema);
module.exports = File;