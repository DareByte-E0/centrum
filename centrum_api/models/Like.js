const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
