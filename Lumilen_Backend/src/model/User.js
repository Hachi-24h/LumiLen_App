// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /@gmail\.com$/, // Kiểm tra email phải có đuôi @gmail.com
        trim: true // Xóa khoảng trắng đầu/cuối
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Có ít nhất 8 ký tự
    },
    dob: {
        type: Date, // Kiểu ngày
        required: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dflxpcdxz/image/upload/v1730394720/DataPicture/w5rbo99qj7vk04uvsblm.jpg"
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Za-zÀ-ỹ\s]+$/ // Không chứa ký tự đặc biệt, trừ dấu cách
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Za-zÀ-ỹ\s]+$/ // Không chứa ký tự đặc biệt, trừ dấu cách
    },
    id: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    collectionUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TableUser'
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
