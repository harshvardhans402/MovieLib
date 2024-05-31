const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://hash22mca:Y5MMmWXY9KeSpkRR@harshvardhansdata.lxisxwm.mongodb.net/MovieLib?retryWrites=true&w=majority&appName=HarshvardhansData", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB is connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed due to " + err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
