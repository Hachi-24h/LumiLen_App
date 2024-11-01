// models/Anh.js
const mongoose = require('mongoose');

const PicutreSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
        trim: true // Xóa khoảng trắng đầu/cuối
    },
    title: {
        type: String,
        required: true,
        maxlength: 200, // Không quá 200 ký tự
        trim: true // Xóa khoảng trắng đầu/cuối
    },
    id: {
        type: String,
        required: true,
        trim: true // Xóa khoảng trắng đầu/cuối
    },
    typePicutre: {
        type: String,
        maxlength: 200, // Không quá 200 ký tự
        default: null,
        trim: true // Xóa khoảng trắng đầu/cuối
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Picutre', PicutreSchema);
