const express = require('express');
const router = express.Router();
const User = require('../../model/User'); // Đảm bảo đường dẫn đúng đến file User.js
const Notification = require('../../model/Notification'); // Đảm bảo đường dẫn đúng đến file Notification.js
const mongoose = require('mongoose');

// Route để thêm một thông báo mới
router.post('/addNotification', async (req, res) => {
    const { message, userID, picture } = req.body;

    // Kiểm tra dữ liệu yêu cầu
    if (!message || !userID || !picture) {
        return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin thông báo." });
    }

    try {
        // Tạo thông báo mới với trường isRead mặc định là false
        const newNotification = new Notification({
            mess: message,
            userID,
            picture,
            isRead: false,  // Thêm trường isRead, mặc định là false
        });

        // Lưu thông báo vào cơ sở dữ liệu
        await newNotification.save();

        res.status(200).json({ message: "Thông báo đã được thêm thành công." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi thêm thông báo." });
    }
});

// Route để lấy tất cả thông báo từ cơ sở dữ liệu
router.get('/allNotifications', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo (mới nhất lên đầu)

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: "Chưa có thông báo nào." });
        }

        res.status(200).json({ notifications });
    } catch (error) {
        console.error("Error fetching all notifications:", error);
        res.status(500).json({ message: "Lỗi server khi lấy tất cả thông báo." });
    }
});
  

// Route để lấy danh sách thông báo của người dùng
// Route để lấy thông báo của người dùng (bạn)
router.get('/notifications/:userId', async (req, res) => {
    const { userId } = req.params;  // Lấy ID của người dùng từ URL
  
    try {
      const notifications = await Notification.find({ userID: userId }).sort({ createdAt: -1 });
  
      if (!notifications || notifications.length === 0) {
        return res.status(404).json({ message: "Chưa có thông báo nào." });
      }
  
      res.status(200).json({ notifications });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Lỗi server khi lấy thông báo." });
    }
});


  // Route để lấy tất cả thông báo từ cơ sở dữ liệu
router.get('/allNotifications', async (req, res) => {
    try {
        // Lấy tất cả các thông báo
        const notifications = await Notification.find().sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo (mới nhất lên đầu)

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: "Chưa có thông báo nào." });
        }

        // Trả về danh sách thông báo
        res.status(200).json({ notifications });
    } catch (error) {
        console.error("Error fetching all notifications:", error);
        res.status(500).json({ message: "Lỗi server khi lấy tất cả thông báo." });
    }
});


module.exports = router;
