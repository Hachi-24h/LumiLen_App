const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /@gmail\.com$/,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },

    idUser: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        enum: ["Female", "Male","Other"],  
        default: "Male"
    },

    dob: {
        type: Date,
        required: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730394720/DataPicture/w5rbo99qj7vk04uvsblm.jpg"
    },
    Description: {
        type: String,
        trim: true,
        default: "Hello, I'm using Lumilen"
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Za-zÀ-ỹ\s]+$/
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Za-zÀ-ỹ\s]+$/
    },
    collectionUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TableUser'
    }],
    ListAnhGhim: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture'
    }],
    Notifi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId 
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
