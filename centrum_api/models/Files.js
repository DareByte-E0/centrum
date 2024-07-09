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
    
}, { timestamps: true });

const File = mongoose.model("File", fileSchema);
module.exports = File;