const express = require('express');
const router = express.Router();
const Picture = require('../../model/Picture');
const User = require('../../model/User');
const mongoose = require('mongoose');
const TableUser = require('../../model/TableUser');


const axios = require('axios'); 



router.get('/getAllPictures', async (req, res) => {
    try {
        // Lấy tất cả các ảnh từ collection Picture
        const pictures = await Picture.find();

        res.status(200).json(pictures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/getListAllPictures', async (req, res) => {
    try {
        // Chỉ lấy trường 'uri' của các ảnh từ collection Picture
        const pictures = await Picture.find({}, 'uri'); // Lấy chỉ trường 'uri'

        // Trích xuất danh sách các uri từ kết quả
        const uris = pictures.map(picture => picture.uri);

        res.status(200).json(uris);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// lấy tất cả ảnh của 1 user dựa trên userId
router.get('/getUserImages', async (req, res) => {
    try {
        const { userId } = req.query; // Lấy userId từ query

        if (!userId) {
            return res.status(400).json({ message: "UserId is required" });
        }

        // Tìm user bằng userId và populate collectionUser cùng với listAnh
        const user = await User.findById(userId)
            .populate({
                path: 'collectionUser',
                populate: {
                    path: 'listAnh',
                    model: 'Picture'
                }
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Lấy tất cả ảnh từ collectionUser
        const allImages = user.collectionUser.flatMap(tableUser => tableUser.listAnh);

        // Trả về trực tiếp mảng ảnh, không có bao quanh "images"
        res.status(200).json(allImages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để thêm một Picture mới

router.post('/addPicture', async (req, res) => {
    try {
        const { uri, title, description, iduser } = req.body;

        // Kiểm tra ID người dùng
        if (!mongoose.Types.ObjectId.isValid(iduser)) {
            return res.status(400).json({ message: "Invalid iduser format." });
        }

        // Tạo một Picture mới
        const newPicture = new Picture({
            uri,
            title,
            description,
            idUser: iduser,
            listUserHeart: [] // Mảng rỗng mặc định
        });

        // Lưu Picture vào cơ sở dữ liệu
        const savedPicture = await newPicture.save();

        // Thêm ảnh vào ListAnhGhim của User
        const user = await User.findById(iduser);
        if (user) {
            user.ListAnhGhim.push(savedPicture._id);
            await user.save();
        }

        res.status(200).json({ message: "Picture added successfully.", picture: savedPicture });
    } catch (error) {
        console.error("Error adding picture:", error);
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

// Hàm thêm ảnh vào TableUser và Ghim
// Hàm thêm ảnh vào bảng
router.post('/addPictureToTableUser', async (req, res) => {
    try {
        const { tableUserId, pictureId, userId } = req.body;

        // Kiểm tra các ID
        if (!mongoose.Types.ObjectId.isValid(tableUserId) || 
            !mongoose.Types.ObjectId.isValid(pictureId) || 
            !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid ID format. Each ID must be a 24-character hex string." });
        }

        // Tìm User để đảm bảo tồn tại
        const user = await User.findById(userId).populate('collectionUser');
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Kiểm tra xem tableUserId có thuộc User này hay không
        const tableUser = user.collectionUser.find(table => table._id.toString() === tableUserId);
        if (!tableUser) {
            return res.status(404).json({ message: "TableUser not found for this user." });
        }

        // In ra để kiểm tra dữ liệu
        console.log("TableUser:", tableUser);
        console.log("Picture ID:", pictureId);
        console.log("List of pictures in table:", tableUser.listAnh);

        // Kiểm tra xem ảnh đã tồn tại trong listAnh của TableUser chưa
        const isPictureExists = tableUser.listAnh.some((pic) => pic.equals(new mongoose.Types.ObjectId(pictureId))); // Sử dụng `equals()` để so sánh ObjectId
        if (isPictureExists) {
            return res.status(400).json({ message: "Picture already exists in this TableUser's list." });
        }

        // Thêm pictureId vào listAnh của TableUser
        tableUser.listAnh.push(pictureId);
        await tableUser.save(); // Lưu vào bảng

        // Cập nhật lại thông tin bảng trong User nếu cần
        await user.save();

        res.status(200).json({ message: "Picture added to table successfully.", tableUser });
    } catch (error) {
        console.error("Error adding picture to table:", error);
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

// router.post('/addPictureAndAssignToTable', upload.fields([{ name: 'img', maxCount: 1 }]), async (req, res) => {
//     try {
//         const { title, description, iduser, tableUserId } = req.body;

//         // Kiểm tra xem file ảnh có được upload hay không
//         if (!req.files || !req.files['img']) {
//             return res.status(400).json({ message: "No files uploaded." });
//         }

//         // Lấy URL của ảnh từ file đã upload
//         const link_img = req.files['img'][0].path;

//         // Kiểm tra ID người dùng
//         if (!mongoose.Types.ObjectId.isValid(iduser)) {
//             return res.status(400).json({ message: "Invalid iduser format." });
//         }

//         // Tạo một Picture mới
//         const newPicture = new Picture({
//             uri: link_img,  // Lưu đường dẫn ảnh
//             title,
//             description,
//             idUser: iduser,
//             listUserHeart: [] // Mảng rỗng mặc định
//         });

//         // Lưu Picture vào cơ sở dữ liệu
//         const savedPicture = await newPicture.save();

//         // Tìm user
//         const user = await User.findById(iduser).populate('collectionUser');
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         // Kiểm tra xem tableUserId có thuộc User này hay không
//         const tableUser = user.collectionUser.find(table => table._id.toString() === tableUserId);
//         if (!tableUser) {
//             return res.status(404).json({ message: "TableUser not found for this user." });
//         }

//         // Kiểm tra xem ảnh đã tồn tại trong listAnh của TableUser chưa
//         const isPictureExists = tableUser.listAnh.some((pic) => pic.equals(new mongoose.Types.ObjectId(savedPicture._id))); // Sử dụng `equals()` để so sánh ObjectId
//         if (isPictureExists) {
//             return res.status(400).json({ message: "Picture already exists in this TableUser's list." });
//         }

//         // Thêm pictureId vào listAnh của TableUser
//         tableUser.listAnh.push(savedPicture._id);
//         await tableUser.save(); // Lưu vào bảng

//         // Cập nhật lại thông tin bảng trong User nếu cần
//         await user.save();

//         // Trả về kết quả
//         res.status(200).json({
//             message: "Picture uploaded, created and added to table successfully.",
//             picture: savedPicture,
//             tableUser: tableUser
//         });
//     } catch (error) {
//         console.error("Error processing request:", error);
//         res.status(500).json({ message: error.message });
//     }
// });




module.exports = router;