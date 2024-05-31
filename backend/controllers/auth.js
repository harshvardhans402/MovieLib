const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();

const isLoggedIn = (req, res) => {
    if (req.isAuthenticated()) return res.status(200).send('OK');
    return res.status(401).send('Unauthorized');
}

const registerUser = (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,

        password: req.body.password
    });

    newUser.save((err, savedUser) => {
        if (err) {
            console.error("Error saving user:", err);
            return res.status(500).send({ error: 'Error saving user to database.' });
        } else {
            console.log("User saved successfully:", savedUser);
            res.status(200).send('OK');
        }
    });
}



const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("email")
            return res.status(401).send({ error: "Invalid credentials" });
        }

        // Check if the password matches    
        if (user.password !== password) {
            console.log("password")
            return res.status(401).send({ error: "Invalid credentials" });
        }

        // If the credentials are valid, generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET);

        res.status(200).send({ token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};

const logoutUser = (req, res) => {
    // Clear the session data
    req.session.destroy((err) => {
        if (err) {
            console.error("Error during logout:", err);
            return res.status(500).send({ error: "Error during logout" });
        }
        // Clear the session cookie
        res.clearCookie('connect.sid', { path: '/' });
        // Respond with a success message
        res.status(200).json({ status: "Success" });
    });
}



module.exports = {
    isLoggedIn,
    registerUser,
    loginUser,
    logoutUser
} 