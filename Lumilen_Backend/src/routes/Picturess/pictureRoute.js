const express = require('express');
const router = express.Router();
const Picture = require('../../model/Picture');
const User = require('../../model/User');
const mongoose = require('mongoose');
const TableUser = require('../../model/TableUser');
// Hàm lấy tất cả các ảnh từ Picture
router.get('/getAllPictures', async (req, res) => {
    try {
        // Lấy tất cả các ảnh từ collection Picture
        const pictures = await Picture.find();

        res.status(200).json(pictures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Hàm tìm ảnh theo id
// http://172.21.80.105:5000/picture/getPictureById/6728e2c2893cc88bd98fd342
router.get('/getPictureById/:id', async (req, res) => {
    try {
        const pictureId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(pictureId)) {
            console.log("ID không hợp lệ:", pictureId);
            return res.status(400).json({ message: "Invalid ID format. ID must be a 24 character hex string." });
        }
        const picture = await Picture.findById(pictureId);

        if (!picture) {
            return res.status(404).json({ message: "Picture not found" });
        }
        res.status(200).json(picture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xóa 1 ảnh dựa trên pictureId
router.delete('/deletePicture', async (req, res) => {
    try {
        const { pictureId } = req.body;

        // Kiểm tra tính hợp lệ của pictureId
        if (!mongoose.Types.ObjectId.isValid(pictureId)) {
            return res.status(400).json({ message: "Invalid ID format. pictureId must be a 24-character hex string." });
        }

        // Tìm và xóa ảnh theo pictureId
        const deletedPicture = await Picture.findByIdAndDelete(pictureId);

        if (!deletedPicture) {
            return res.status(404).json({ message: "Picture not found." });
        }

        res.status(200).json({ message: "Picture deleted successfully.", deletedPicture });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Hàm thêm ảnh mới vào Picture và liên kết với User
router.post('/addPictureToTableUser', async (req, res) => {
    try {
        const { userId, tableUserId, pictureId } = req.body;

       

        if (!mongoose.Types.ObjectId.isValid(userId) || 
            !mongoose.Types.ObjectId.isValid(tableUserId) || 
            !mongoose.Types.ObjectId.isValid(pictureId)) {
            return res.status(400).json({ message: "Invalid ID format. Each ID must be a 24-character hex string." });
        }

        // Tìm kiếm User dựa trên userId
        const user = await User.findById(userId).populate('collectionUser'); // Giả sử `collectionUser` chứa các `tableUserId`

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Kiểm tra xem tableUserId có thuộc User này hay không
        const tableUserExists = user.collectionUser.some(tableUser => tableUser._id.toString() === tableUserId);
        if (!tableUserExists) {
            return res.status(404).json({ message: "TableUser not found for this user." });
        }

        // Tìm kiếm TableUser dựa trên tableUserId
        const tableUser = await TableUser.findById(tableUserId);
        if (!tableUser) {
            return res.status(404).json({ message: "TableUser not found." });
        }

        // Kiểm tra xem pictureId đã tồn tại trong listAnh của TableUser chưa
        if (tableUser.listAnh.includes(pictureId)) {
            return res.status(400).json({ message: "Picture already exists in this TableUser's list." });
        }

        // Thêm pictureId vào listAnh
        tableUser.listAnh.push(pictureId);

        // Lưu thay đổi vào cơ sở dữ liệu
        await tableUser.save();

        res.status(200).json({ message: "Picture added to listAnh successfully.", tableUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xóa 1 ảnh khỏi listAnh của TableUser
// {
//     "userId": "6727b1969231f99f2655f0ab",
//     "tableUserId": "6728d16c5503c9d22355e8d3",
//     "pictureId": "6728e2c2893cc88bd98fd342"
// }
router.delete('/remPicFroTab', async (req, res) => {
    try {
        const { userId, tableUserId, pictureId } = req.body;

        // Kiểm tra tính hợp lệ của userId, tableUserId và pictureId
        if (!mongoose.Types.ObjectId.isValid(userId) || 
            !mongoose.Types.ObjectId.isValid(tableUserId) || 
            !mongoose.Types.ObjectId.isValid(pictureId)) {
            return res.status(400).json({ message: "Invalid ID format. Each ID must be a 24-character hex string." });
        }

        // Tìm kiếm User dựa trên userId và đảm bảo rằng TableUser thuộc về User này
        const user = await User.findById(userId).populate('collectionUser'); // Giả sử `collectionUser` chứa các `tableUserId`
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Kiểm tra xem tableUserId có thuộc User này hay không
        const tableUserExists = user.collectionUser.some(tableUser => tableUser._id.toString() === tableUserId);
        if (!tableUserExists) {
            return res.status(404).json({ message: "TableUser not found for this user." });
        }

        // Tìm kiếm TableUser dựa trên tableUserId
        const tableUser = await TableUser.findById(tableUserId);
        if (!tableUser) {
            return res.status(404).json({ message: "TableUser not found." });
        }

        // Kiểm tra xem pictureId có trong listAnh của TableUser không
        const pictureIndex = tableUser.listAnh.indexOf(pictureId);
        if (pictureIndex === -1) {
            return res.status(404).json({ message: "Picture not found in listAnh." });
        }

        // Xóa pictureId khỏi listAnh
        tableUser.listAnh.splice(pictureIndex, 1);

        // Lưu thay đổi vào cơ sở dữ liệu
        await tableUser.save();

        res.status(200).json({ message: "Picture removed from listAnh successfully.", tableUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;