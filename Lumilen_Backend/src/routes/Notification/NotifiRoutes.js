const express = require('express');
const router = express.Router();
const User = require('../../model/User'); // Đảm bảo đường dẫn đúng đến file User.js
const Notification = require('../../model/Notification'); // Đảm bảo đường dẫn đúng đến file Notification.js
const mongoose = require('mongoose');

// Route để thêm một thông báo vào danh sách Notifi của người dùng
router.post('/addNotification/:userId', async (req, res) => {
    const { userId } = req.params; // ID của người dùng nhận thông báo
    const { message, isRead, userID, picture } = req.body; // Nội dung thông báo

    try {
        // Tạo thông báo mới
        const newNotification = new Notification({
            message,
            isRead: isRead || false, // Mặc định isRead là false nếu không được cung cấp
            userID,
            picture
        });

        // Lưu thông báo mới vào cơ sở dữ liệu
        await newNotification.save();

        // Tìm người dùng và thêm ID của thông báo mới vào danh sách Notifi
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        // Kiểm tra nếu danh sách Notifi có nhiều hơn 29 thông báo
        if (user.Notifi.length >= 30) {
            // Xóa thông báo cũ nhất (thông báo đầu tiên trong mảng)
            user.Notifi.shift();
        }

        // Thêm ID của thông báo mới vào Notifi
        user.Notifi.push(newNotification._id);
        await user.save();

        res.status(200).json({ message: "Thông báo đã được thêm thành công.", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
