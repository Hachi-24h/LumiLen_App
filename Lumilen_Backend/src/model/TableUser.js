// models/Bang.js
const mongoose = require('mongoose');

const TableUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Xóa khoảng trắng đầu/cuối
    },
    listAnh: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picutre',
        required: true
    }]
}, {
    timestamps: true,
});

TableUserSchema.path('listAnh').validate(function (value) {
    return value.length > 0;
}, "TableUser phải có ít nhất một ảnh trong listAnh.");

module.exports = mongoose.model('TableUser', TableUserSchema);
