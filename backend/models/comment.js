const mongoose = require("mongoose");
const User = require("./user");

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;