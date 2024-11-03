// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const Picutre = require('../../model/Picture');
const TableUser = require('../../model/TableUser');
const Notification = require('../../model/Notification');

// Thêm một người dùng mới
router.post('/addUser', async (req, res) => {
    const { email, password, dob, firstName, lastName } = req.body;

    try {
        // Kiểm tra nếu email đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại." });
        }

        // Tạo user mới với các thông tin được cung cấp
        const newUser = new User({
            email,
            password, // Lưu ý: Cần mã hóa mật khẩu trước khi lưu
            dob,
            firstName,
            lastName,
            collectionUser: [],
            ListAnhGhim: [],
            Notifi: [],
            following: [],
            followers: []
        });

        // Lưu user vào cơ sở dữ liệu
        await newUser.save();

        // Trả về thông tin user mới tạo
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy tất cả người dùng với đầy đủ thông tin liên quan
router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find()
            .populate({
                path: 'collectionUser', // Lấy thông tin của từng TableUser
                populate: {
                    path: 'listAnh', // Lấy thông tin của từng Picture trong listAnh
                    model: 'Picture'
                }
            })
            .populate('ListAnhGhim') // Lấy chi tiết của ListAnhGhim
            .populate({
                path: 'Notifi', // Lấy chi tiết của Notification
                select: 'mess createdAt isRead userID picture' // Chỉ chọn các trường có trong Notification
            })
            .populate('following', 'email firstName lastName') // Lấy thông tin cơ bản của following
            .populate('followers', 'email firstName lastName'); // Lấy thông tin cơ bản của followers

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
