const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID"); // Thay bằng client ID từ Google Cloud Console

router.post('/auth/google', async (req, res) => {
    const { idToken } = req.body;

    try {
        // Xác minh token Google
        const ticket = await client.verifyIdToken({
            idToken,
            audience: "YOUR_GOOGLE_CLIENT_ID",
        });
        const payload = ticket.getPayload();
        const { email, name, sub } = payload;

        // Tìm kiếm hoặc tạo người dùng mới
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                email,
                firstName: name.split(' ')[0],
                lastName: name.split(' ')[1],
                idUser: sub,
            });
            await user.save();
        }

        res.status(200).json({ success: true, message: "Đăng nhập Google thành công", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Xác thực Google thất bại", error: error.message });
    }
});

module.exports = router;
