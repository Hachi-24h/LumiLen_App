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
// Thêm một ảnh vào ListAnhGhim của người dùng
router.post('/addPictureToListAnhGhim/:userId', async (req, res) => {
    const { userId } = req.params;  // Lấy userId từ params
    const { pictureId } = req.body;  // Lấy pictureId từ body của request

    // Kiểm tra tính hợp lệ của pictureId
    if (!mongoose.Types.ObjectId.isValid(pictureId)) {
        return res.status(400).json({ message: "pictureId không hợp lệ." });
    }

    try {
        // Tìm người dùng với userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        // Kiểm tra nếu pictureId đã có trong danh sách ListAnhGhim
        if (user.ListAnhGhim.includes(pictureId)) {
            return res.status(400).json({ message: "Ảnh đã tồn tại trong ListAnhGhim." });
        }

        // Nếu chưa có, thêm ảnh vào ListAnhGhim
        user.ListAnhGhim.push(pictureId);
        await user.save();

        return res.status(200).json({ message: "Thêm ảnh vào ListAnhGhim thành công.", user });
    } catch (error) {
        console.error("Lỗi khi thêm ảnh vào ListAnhGhim:", error);
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

        // Kiểm tra nếu đã theo dõi thì xóa
        if (user.followers.includes(followerId)) {
            user.followers = user.followers.filter((id) => id !== followerId);
        } else {
            // Nếu chưa theo dõi thì thêm vào
            user.followers.push(followerId);
        }

        // Lưu người dùng sau khi cập nhật
        await user.save();

        res.status(200).json({ message: "Cập nhật danh sách followers thành công.", followers: user.followers });
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

// Lấy danh sách historyText của một user
router.get('/getUserHistory/:id', async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ params

        // Tìm user theo id và chỉ lấy trường historyText
        const user = await User.findById(id).select('historyText');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
           
            historyText: user.historyText
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xóa một historyText của user
router.delete('/deleteHistoryText', async (req, res) => {
    try {
        const { id, text } = req.body; // Lấy id và text từ request body

        // Kiểm tra nếu text không hợp lệ
        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Text is required and cannot be empty" });
        }

        // Tìm user theo id và xóa text khỏi historyText
        const user = await User.findByIdAndUpdate(
            id,
            { $pull: { historyText: text.trim() } }, // Xóa text khớp với giá trị được cung cấp
            { new: true } // Trả về user sau khi cập nhật
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "HistoryText deleted successfully",
            historyText: user.historyText,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Thêm một historyText cho user với kiểm tra trùng lặp và giới hạn 10 phần tử
router.post('/addHistoryText', async (req, res) => {
    try {
        const { id, text } = req.body; // Lấy id và text từ request body

        // Kiểm tra nếu text không hợp lệ
        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Text is required and cannot be empty" });
        }

        // Tìm user theo id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Kiểm tra nếu text đã tồn tại trong historyText
        if (user.historyText.includes(text.trim())) {
            return res.status(200).json({
                message: "Text already exists in history",
                historyText: user.historyText,
            });
        }

        // Kiểm tra nếu mảng đã đủ 10 phần tử
        if (user.historyText.length >= 15) {
            user.historyText.shift(); // Xóa phần tử đầu tiên trong mảng
        }

        // Thêm phần tử mới vào mảng
        user.historyText.push(text.trim());

        // Lưu user sau khi cập nhật
        await user.save();

        res.status(200).json({
            message: "HistoryText added successfully",
            historyText: user.historyText,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/checkNameUser', async (req, res) => {
    const { idUser } = req.body; // Lấy username từ yêu cầu

    if (!idUser) {
        return res.status(400).json({ message: "idUser không được để trống" });
    }

    try {
        // Tìm kiếm người dùng với username đã cung cấp
        const existingUser = await User.findOne({ idUser: idUser });

        if (existingUser) {
            // Nếu đã tồn tại, trả về thông báo lỗi
            return res.status(200).json({ exists: true, message: "Tên người dùng đã tồn tại" });
        }

        // Nếu không tồn tại, trả về thông báo thành công
        res.status(200).json({ exists: false, message: "Tên người dùng có thể sử dụng" });
    } catch (error) {
        // Xử lý lỗi bất ngờ
        res.status(500).json({ message: error.message });
    }
});

router.get('/getUserImages', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "UserId is required" });
        }

        const user = await User.findById(userId).populate('ListAnhGhim'); // Populate danh sách ảnh

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const images = user.ListAnhGhim.map((picture) => ({
            ...picture.toObject(), // Copy dữ liệu ảnh
            user: {
                avatar: user.avatar, // Gắn avatar của user vào mỗi ảnh
                firstName: user.firstName,
                lastName: user.lastName,
            },
        }));

        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getAllPicturesWithAvatar', async (req, res) => {
    try {
        const pictures = await Picture.find(); // Lấy tất cả ảnh

        // Lấy danh sách tất cả `userId` liên quan đến ảnh (giả sử userId được lưu ở đâu đó)
        const userIds = pictures.map((picture) => picture.idUser); // Thay idUser bằng logic phù hợp

        // Lấy thông tin người dùng từ danh sách userIds
        const users = await User.find({ _id: { $in: userIds } });

        // Kết hợp thông tin avatar vào từng ảnh
        const result = pictures.map((picture) => {
            const user = users.find((u) => u._id.toString() === picture.idUser); // Tìm user tương ứng
            return {
                ...picture.toObject(),
                user: user ? { avatar: user.avatar, firstName: user.firstName, lastName: user.lastName } : null,
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update email
router.put('/updateEmail/:id', async (req, res) => {
    const { id } = req.params;  // Lấy id của user cần cập nhật
    const { newEmail } = req.body;  // Lấy email mới từ request body

    try {
        // Kiểm tra xem email mới đã tồn tại trong cơ sở dữ liệu chưa
        const existingUser = await User.findOne({ email: newEmail });

        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại, vui lòng chọn email khác.' });
        }

        // Cập nhật email của người dùng nếu không có sự trùng lặp
        const updatedUser = await User.findByIdAndUpdate(id, { email: newEmail }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với ID đã cho.' });
        }

        res.status(200).json({
            message: 'Cập nhật email thành công.',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
