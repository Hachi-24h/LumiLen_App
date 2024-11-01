// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const Picutre = require('../model/Picture');
const TableUser = require('../model/TableUser');


router.get('/', async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng theo email
        const user = await User.findOne({ email });

        if (user) {
            // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // Nếu đúng, trả về thành công
                res.status(200).json({ success: true, message: "Login successful", user });
            } else {
                // Nếu mật khẩu không đúng, trả về lỗi
                res.status(401).json({ success: false, message: "Invalid password" });
            }
        } else {
            // Nếu không tìm thấy người dùng, trả về lỗi
            res.status(401).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Thêm 1 ảnh 
router.post('/pictures', async (req, res) => {
    const { uri, title, id, typePicutre } = req.body;

    try {
       
        const existingPicture = await Picutre.findOne({ id });
        if (existingPicture) {
            return res.status(400).json({ message: "ID đã được sử dụng cho một Picture khác" });
        }

        // Tạo một Picture mới
        const newPicture = new Picutre({
            uri,
            title,
            id,
            typePicutre
        });
        await newPicture.save();

        res.status(201).json(newPicture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm 1 TableUser
router.post('/tableusers', async (req, res) => {
    const { name, listAnh } = req.body;

    try {
        // Kiểm tra nếu danh sách ảnh rỗng
        if (!listAnh || listAnh.length === 0) {
            return res.status(400).json({ message: "TableUser phải có ít nhất một ảnh trong listAnh." });
        }

        // Kiểm tra xem tất cả các ObjectId trong listAnh có tồn tại trong collection Picutre không
        const existingPictures = await Picutre.find({ _id: { $in: listAnh } });
        if (existingPictures.length !== listAnh.length) {
            return res.status(400).json({ message: "Một hoặc nhiều ảnh trong listAnh không tồn tại." });
        }

        // Tạo một TableUser mới
        const newTableUser = new TableUser({
            name,
            listAnh
        });

        // Lưu TableUser vào cơ sở dữ liệu
        await newTableUser.save();

        // Trả về thông tin của TableUser mới tạo
        res.status(201).json(newTableUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm một user mới
router.post('/register', async (req, res) => {
    const { email, password, dob, avatar, firstName, lastName, id, collectionUser } = req.body;

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã được sử dụng." });
        }

        // Kiểm tra các ObjectId trong collectionUser
        const validCollections = await TableUser.find({ _id: { $in: collectionUser } });
        if (validCollections.length !== collectionUser.length) {
            return res.status(400).json({ message: "Một hoặc nhiều Collection User không hợp lệ." });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo một User mới
        const newUser = new User({
            email,
            password: hashedPassword, // Lưu mật khẩu đã mã hóa
            dob,
            avatar,
            firstName,
            lastName,
            id,
            collectionUser
        });

        // Lưu User vào cơ sở dữ liệu
        await newUser.save();

        // Trả về thông tin của User mới tạo (ẩn mật khẩu)
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/findUser', async (req, res) => {
    const { email } = req.query; 

    try {
        
        const user = await User.findOne({ email })
            .populate({
                path: 'collectionUser',
                populate: {
                    path: 'listAnh',
                    model: 'Picutre' 
                }
            });


        res.status(200).json(user || null);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
