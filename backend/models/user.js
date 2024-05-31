const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
  
    password: String
});

const playlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    isPublic: { type: Boolean, default: true },
    movies: [{ type: Object }],
});
const PlayList = mongoose.model('Playlist', playlistSchema);

const User = mongoose.model("User", userSchema);

module.exports = { User, PlayList };