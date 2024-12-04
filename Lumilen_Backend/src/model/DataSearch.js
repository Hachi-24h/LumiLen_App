const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Tiêu đề không được để trống'],
        trim: true,  // Loại bỏ khoảng trắng đầu/cuối
    },
    quantity: {
        type: Number,
        required: [true, 'Số lượng không được để trống'],
        default: 1,  // Mặc định là số 1
        validate: {
            validator: Number.isInteger,
            message: 'Số lượng phải là số nguyên'
        },
        min: [1, 'Số lượng phải lớn hơn 0'] 
    },
}, {
    timestamps: true,  
});

module.exports = mongoose.model('DataSearch', dataSchema);
