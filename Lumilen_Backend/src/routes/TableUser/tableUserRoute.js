const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const TableUser = require('../../model/TableUser'); 
const mongoose = require('mongoose');
// Hàm thêm TableUser cho User
// {
//     "userId": "6727b1969231f99f2655f0ab",       
//     "name": "Table 1 - Hachi sama",
//     "statusTab": "unblock"
// }
router.post('/addTableUser', async (req, res) => {
    try {
        const userId = req.body.userId;

        const newTableUser = new TableUser({
            name: req.body.name,
            listAnh: [], 
            statusTab: req.body.statusTab || "unblock" 
        });
        const savedTableUser = await newTableUser.save();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.collectionUser.push(savedTableUser._id);
        await user.save();
        res.status(200).json({ message: "TableUser added successfully", tableUser: savedTableUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Hàm tìm kiếm TableUser theo tên trong một User cụ thể
// http://192.168.0.102:5000/searchByName?userId=12345&name=hachi
router.get('/searchByName', async (req, res) => {
    try {
        const { userId, name } = req.query;


        if (!userId || !name) {
            return res.status(400).json({ message: "Please provide both userId and name to search" });
        }


        const user = await User.findById(userId).populate({
            path: 'collectionUser',
            match: { name: { $regex: name, $options: 'i' } } 
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Lọc danh sách collectionUser theo từ khóa name
        const matchingTableUsers = user.collectionUser;

        res.status(200).json(matchingTableUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Hàm xóa TableUser của một User
// {
//     "userId": "6727b1969231f99f2655f0ab",        
//     "tableUserId": "6728d493e8b0ab6860622821" 
// }
router.delete('/deleteTableUser', async (req, res) => {
    try {
        const { userId, tableUserId } = req.body; // Lấy userId và tableUserId từ body request

        // Tìm User để đảm bảo tồn tại
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Kiểm tra xem TableUser có nằm trong collectionUser của User không
        if (!user.collectionUser.includes(tableUserId)) {
            return res.status(404).json({ message: "TableUser not found in user's collection" });
        }

        // Xóa TableUser khỏi collectionUser của User
        user.collectionUser = user.collectionUser.filter(id => id.toString() !== tableUserId);
        await user.save();

        // Xóa TableUser khỏi collection TableUser
        await TableUser.findByIdAndDelete(tableUserId);

        res.status(200).json({ message: "TableUser deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Hàm sửa tên TableUser của một User
// {
//     "userId": "6727b3836b957d547511fbd0",       
//     "name": "Table 1 - Hachi",
//     "statusTab": "unblock"
// }
router.put('/updateTableUser', async (req, res) => {
    try {
        const { userId, tableUserId, newName, newStatus } = req.body; // Lấy userId, tableUserId, newName, và newStatus từ body request

        // Kiểm tra xem các tham số có đủ không
        if (!userId || !tableUserId || !newName || !newStatus) {
            return res.status(400).json({ message: "Please provide userId, tableUserId, newName, and newStatus" });
        }

        // Tìm User để đảm bảo tồn tại
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Kiểm tra xem TableUser có nằm trong collectionUser của User không
        if (!user.collectionUser.includes(tableUserId)) {
            return res.status(404).json({ message: "TableUser not found in user's collection" });
        }

        // Tìm và cập nhật tên và trạng thái của TableUser
        const updatedTableUser = await TableUser.findByIdAndUpdate(
            tableUserId,
            { name: newName, statusTab: newStatus },
            { new: true }
        );

        if (!updatedTableUser) {
            return res.status(404).json({ message: "TableUser not found" });
        }

        res.status(200).json({ message: "TableUser updated successfully", tableUser: updatedTableUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
