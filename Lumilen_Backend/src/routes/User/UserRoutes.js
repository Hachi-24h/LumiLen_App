const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const mongoose = require('mongoose');


// Check Login  
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Logic xác thực đăng nhập
    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) {  // Giả định mật khẩu không mã hóa, nếu có thì dùng bcrypt
            res.status(200).json({ success: true, message: "Login successful", user });
        } else {
            res.status(401).json({ success: false, message: "Invalid email or password." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred." });
    }
});


// Thêm một người dùng mới
router.post('/addUser', async (req, res) => {
    try {
        const { email, password, dob, firstName, lastName, idUser, gender } = req.body;

        console.log("Dữ liệu nhận được từ req.body:", req.body); // Kiểm tra dữ liệu đầu vào

        // Kiểm tra xem email đã tồn tại trong hệ thống chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã được sử dụng" });
        }

        // Tạo người dùng mới với thông tin từ yêu cầu
        const newUser = new User({
            email,
            password, // Lưu mật khẩu không mã hóa
            dob,
            firstName,
            lastName,
            idUser,
            gender, // Đặt giới tính
            collectionUser: [],
            ListAnhGhim: [],
            Notifi: [],
            following: [],
            followers: [],
            historyText: []
        });

        // Lưu người dùng mới vào cơ sở dữ liệu
        await newUser.save();

        // Trả về thông tin người dùng mới tạo
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Lỗi khi tạo người dùng mới:", error);
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

// Cập nhật thông tin cơ bản của người dùng
router.put('/updateUser/:userId', async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    console.log("Dữ liệu cập nhật:", req.body); // Kiểm tra dữ liệu tại đây

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm một ảnh vào ListAnhGhim của người dùng
router.post('/addPictureToListAnhGhim/:userId', async (req, res) => {
    const { userId } = req.params;
    const { pictureId } = req.body;
    console.log("pictureId nhận được:", pictureId); // Kiểm tra giá trị của pictureId

    if (!mongoose.Types.ObjectId.isValid(pictureId)) {
        return res.status(400).json({ message: "pictureId không hợp lệ." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        if (!user.ListAnhGhim.includes(pictureId)) {
            user.ListAnhGhim.push(pictureId);
            await user.save();
            return res.status(200).json({ message: "Thêm ảnh vào ListAnhGhim thành công.", user });
        } else {
            return res.status(400).json({ message: "Ảnh đã tồn tại trong ListAnhGhim." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để thêm một người dùng vào following
router.post('/addFollowing/:userId', async (req, res) => {
    const { userId } = req.params; // ID của người dùng hiện tại
    const { followId } = req.body; // ID của người dùng muốn theo dõi

    // Kiểm tra tính hợp lệ của `followId`
    if (!mongoose.Types.ObjectId.isValid(followId)) {
        return res.status(400).json({ message: "followId không hợp lệ." });
    }

    try {
        // Tìm người dùng hiện tại
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        // Kiểm tra nếu `followId` đã có trong danh sách `following` để tránh trùng lặp
        if (!user.following.includes(followId)) {
            user.following.push(followId);
            await user.save();
            return res.status(200).json({ message: "Đã thêm vào danh sách following.", user });
        } else {
            return res.status(400).json({ message: "Người dùng đã tồn tại trong danh sách following." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để thêm một người dùng vào followers
router.post('/addFollower/:userId', async (req, res) => {
    const { userId } = req.params; // ID của người dùng được theo dõi
    const { followerId } = req.body; // ID của người theo dõi

    // Kiểm tra tính hợp lệ của `followerId`
    if (!mongoose.Types.ObjectId.isValid(followerId)) {
        return res.status(400).json({ message: "followerId không hợp lệ." });
    }

    try {
        // Tìm người dùng được theo dõi
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        // Kiểm tra nếu `followerId` đã có trong danh sách `followers` để tránh trùng lặp
        if (!user.followers.includes(followerId)) {
            user.followers.push(followerId);
            await user.save();
            return res.status(200).json({ message: "Đã thêm vào danh sách followers.", user });
        } else {
            return res.status(400).json({ message: "Người dùng đã tồn tại trong danh sách followers." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để tìm người dùng theo idUser
router.get('/findUserByIdUser', async (req, res) => {
    const { idUser } = req.query; // Lấy idUser từ query parameters

    if (!idUser) {
        return res.status(400).json({ message: "idUser là bắt buộc." });
    }

    try {
        const user = await User.findOne({ idUser });

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route để tìm người dùng theo email
router.get('/findUserByEmail', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email là bắt buộc." });
    }

    try {
        // Find the user by email and populate associated collections
        const user = await User.findOne({ email })
            .populate({
                path: 'collectionUser',
                populate: {
                    path: 'listAnh',
                    model: 'Picture' // populates the listAnh field with Picture data
                }
            })
            .populate('ListAnhGhim', 'uri title typePicture') // populates the pinned images
            .populate('Notifi', 'mess createdAt isRead'); // populates notifications

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        // Send the complete user data with populated information
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để tìm người dùng theo _id
router.get('/findUserById/:id', async (req, res) => {
    const { id } = req.params; // Lấy _id từ params

    try {
        // Tìm người dùng theo _id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        // Trả về thông tin người dùng
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để tìm người dùng theo firstName và lastName
router.get('/findUserByName', async (req, res) => {
    const { firstName, lastName } = req.query; // Lấy firstName và lastName từ query parameters

    try {
        // Tìm người dùng theo firstName và lastName
        const users = await User.find({ firstName, lastName });

        if (users.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng nào với tên đã cho." });
        }

        // Trả về danh sách người dùng tìm được
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để xóa người dùng theo userId
router.delete('/deleteUser/:userId', async (req, res) => {
    const { userId } = req.params; // Lấy userId từ params

    try {
        // Tìm và xóa người dùng theo userId
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        // Trả về thông báo thành công nếu xóa thành công
        res.status(200).json({ message: "Người dùng đã được xóa thành công." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để xử lý Google Login
router.post('/auth/google', async (req, res) => {
    const { accessToken } = req.body;

    try {
        // Gửi yêu cầu đến Google API để lấy thông tin người dùng
        const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
        const { email, name } = googleResponse.data;

        // Kiểm tra nếu người dùng đã tồn tại
        let user = await User.findOne({ email });
        if (!user) {
            // Tạo người dùng mới nếu chưa tồn tại
            user = new User({
                email,
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' '),
                // Các trường khác có thể điền mặc định hoặc thêm theo yêu cầu
            });
            await user.save();
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error during Google Login:", error);
        res.status(500).json({ success: false, message: "An error occurred during Google login." });
    }
});

module.exports = router;
