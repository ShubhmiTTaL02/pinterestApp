const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pintrestClone");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    dp: {
        type: String, // URL of profile picture
        default: "" 
    },
    posts: []
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);

