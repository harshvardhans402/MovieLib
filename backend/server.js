require("dotenv").config();
const jwt = require("jsonwebtoken");

// import modules
const path = require("path");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const { User, PlayList } = require("./models/user");
const bodyParser = require('body-parser');
// initialize constants
const PORT = process.env.PORT;

// initialize express app
const app = express();

// initialize middlewares
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
app.use(express.json({ extended: false }));
app.use(cors({
    origin: ["https://movie-lib-etuy-k5972lp6o-harshvardhan-sharmas-projects-e47e30b9.vercel.app"],
    methods: ['POST', 'GET'], credentials: true
}));



connectDB();




app.use(bodyParser.json())
app.get('/api/user/name', async (req, res) => {
    const userObjectId = req.query.userObjectId;
    try {
        const user = await User.findById(userObjectId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ name: user.name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



app.get('/api/userPlaylists', async (req, res) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {

        const decoded = jwt.verify(token, 'PRIVATE_KEY');

        const userId = decoded.userId; // Assuming your token contains a userId field
        const playlists = await PlayList.find({ userId });
        if (playlists.length === 0) {
            return res.status(404).json({ message: 'No playlists found for this user' });
        }
        return res.status(200).json(playlists);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
})

app.post('/api/AddPlayList', async (req, res) => {
    const { userId, name, isPublic } = req.body;
    try {
        const decoded = jwt.verify(userId.token, 'PRIVATE_KEY');
        console.log(decoded)
        if (!decoded.userId || !name) {

            return res.status(400).send({ error: 'User ID and playlist name are required.' });
        }

        try {
            const user = await User.findById(decoded.userId);
            const playlist = await PlayList.findOne({ userId: decoded.userId, name: { $regex: new RegExp(`^${name}$`, 'i') } });
            if (!user) {
                return res.status(404).send({ error: 'User not found.' });
            }

            if (playlist) {
                return res.status(404).send({ error: 'PlayList already exist' })
            }

            const newPlaylist = new PlayList({
                userId: user._id,
                name,
                isPublic,
                movies: [],
            });

            const savedPlaylist = await newPlaylist.save();
            res.status(200).send({ message: 'Playlist created successfully', playlist: savedPlaylist });
        } catch (err) {
            console.error('Error creating playlist:', err);
            res.status(500).send({ error: 'Error creating playlist.' });
        }
    }
    catch (err) {
        console.log()
    }

});
app.post('/api/AddMovie', async (req, res) => {

    const { userId, playlist_id, isPublic, movie } = req.body;

    try {
        const decoded = jwt.verify(userId, 'PRIVATE_KEY');
        console.log(decoded)
        try {
            const user = await User.findById(decoded.userId);
            const playlist = await PlayList.findById(playlist_id);
            playlist.movies.map((m) => {
                if (m.Title === movie.Title) {
                    return res.status(200).send("already added")
                }

            })
            playlist.movies.push(movie)
            console.log(movie)
            if (!user) {
                return res.status(404).send({ error: 'User not found.' });
            }

            if (!playlist) {
                return res.status(404).send({ error: `PlayList doesn't exist` })
            }
            const newPlaylist = new PlayList(playlist);

            const savedPlaylist = await newPlaylist.save();
            res.status(200).send({ message: 'Playlist created successfully', savedPlaylist });
        } catch (err) {
            console.error('Error creating playlist:', err);
            res.status(500).send({ error: 'Error creating playlist.' });
        }
    }
    catch (err) {
        console.log()
    }

});


app.get('/api/playlists/:playlistId', async (req, res) => {
    const playlistId = req.params.playlistId;
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, 'PRIVATE_KEY');
    console.log(playlistId)

    try {
        const playlist = await PlayList.findOne({ _id: playlistId });

        console.log(playlist)
        console.log(playlist.userId == decoded.userId)

        if (!playlist) {
            return res.status(404).send('Playlist not found');
        }

        // Check if user has access to the playlist (replace with your logic)
        if (playlist.userId == decoded.userId || playlist.isPublic) {

            console.log(playlist.isPublic)
            console.log(playlist)
            res.json(playlist);
        }
        else {
            return res.status(403).send('Unauthorized access');

        }


    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});




app.use("/api/auth", authRoutes);

// start and listen express web server
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));