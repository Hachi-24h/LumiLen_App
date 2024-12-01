const mongoose = require('mongoose');

const TableUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Xóa khoảng trắng đầu/cuối
    },
    listAnh: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture'
    }],
    statusTab: {
        type: String,
        enum: ["unblock", "block",],
        default: "unblock"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('TableUser', TableUserSchema);
