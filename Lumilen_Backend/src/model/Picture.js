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
    idUser: {
        type: String,
        required: true,
        trim: true 
    },
    description: {
        type: String,
        maxlength: 200, // Không quá 200 ký tự
        default: "", // Chuỗi rỗng mặc định
        trim: true // Xóa khoảng trắng đầu/cuối
    },
    listUserHeart: {
        type: [String], // Mảng các chuỗi
        default: [] // Mảng trống mặc định
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Picture', PictureSchema);
