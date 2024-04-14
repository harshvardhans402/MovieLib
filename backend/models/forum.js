const mongoose = require("mongoose");
const Comment = require("./comment");
const User = require("./user");

const forumSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Comment
    }]
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;