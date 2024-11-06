const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
        trim: true // Xóa khoảng trắng đầu/cuối
    },
    title: {
        type: String,
        maxlength: 200, // Không quá 200 ký tự
        trim: true, // Xóa khoảng trắng đầu/cuối
        default: null // Cho phép null hoặc để trống
    },
    id: {
        type: String,
        required: true,
        trim: true // Xóa khoảng trắng đầu/cuối
    },
    typePicture: {
        type: String,
        maxlength: 200, // Không quá 200 ký tự
        default: null,
        trim: true // Xóa khoảng trắng đầu/cuối
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Picture', PictureSchema);
