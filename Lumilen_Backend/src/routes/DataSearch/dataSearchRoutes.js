const express = require('express');
const mongoose = require('mongoose');
const DataSearch = require('../../model/DataSearch');  // Đảm bảo đường dẫn đúng model
const router = express.Router();
const nlp = require('compromise');

router.post('/addDataSearch', async (req, res) => {
    const { userText } = req.body;

    if (!userText || typeof userText !== 'string') {
        return res.status(400).json({ message: 'Chuỗi nhập vào không hợp lệ' });
    }

    try {
        // Lấy tất cả các title trong cơ sở dữ liệu
        const existingData = await DataSearch.find();

        // Phân tích chuỗi đầu vào với `compromise`
        const doc = nlp(userText.toLowerCase());
        const userTopic = doc.topics().out('array')[0];  // Lấy chủ đề chính

        let bestMatch = null;
        let highestSimilarity = 0;

        // Lặp qua các tiêu đề hiện có
        existingData.forEach(data => {
            const titleDoc = nlp(data.title.toLowerCase());
            const titleTopic = titleDoc.topics().out('array')[0];

            // Kiểm tra sự tương đồng chủ đề
            if (userTopic === titleTopic) {
                const similarity = 1;  // Chủ đề trùng nhau hoàn toàn
                if (similarity > highestSimilarity) {
                    highestSimilarity = similarity;
                    bestMatch = data;
                }
            }
        });

        if (highestSimilarity >= 0.8) {
            bestMatch.quantity += 1;
            await bestMatch.save();
            return res.status(200).json({ message: 'Cập nhật thành công', data: bestMatch });
        } else {
            const newDataSearch = new DataSearch({
                title: userText.trim(),
                quantity: 1
            });
            await newDataSearch.save();
            return res.status(201).json({ message: 'Thêm mới thành công', data: newDataSearch });
        }
    } catch (error) {
        console.error('Lỗi khi thêm hoặc cập nhật DataSearch:', error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau' });
    }
});

router.get('/getAllDataSearch', async (req, res) => {
    try {
        // Truy vấn tất cả các tài liệu trong collection DataSearch
        const dataSearchList = await DataSearch.find(); // Sử dụng `find()` để lấy tất cả

        // Kiểm tra xem có dữ liệu không
        if (dataSearchList.length === 0) {
            return res.status(404).json({ message: "Không có dữ liệu DataSearch nào" });
        }

        // Trả về danh sách dữ liệu
        res.status(200).json(dataSearchList);
    } catch (error) {
        console.error('Lỗi khi lấy tất cả DataSearch:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy dữ liệu' });
    }
});

router.get('/getTop3DataSearch', async (req, res) => {
    try {
        // Sử dụng aggregate để lấy top 3 DataSearch được tìm kiếm nhiều nhất
        const topDataSearch = await DataSearch.aggregate([
            {
                $sort: { quantity: -1 }  // Sắp xếp theo quantity giảm dần
            },
            {
                $limit: 3  // Giới hạn chỉ lấy 3 kết quả
            }
        ]);

        // Kiểm tra xem có dữ liệu không
        if (topDataSearch.length === 0) {
            return res.status(404).json({ message: "Không có dữ liệu DataSearch" });
        }

        // Trả về top 3 dữ liệu
        res.status(200).json(topDataSearch);
    } catch (error) {
        console.error('Lỗi khi lấy top 3 DataSearch:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy dữ liệu' });
    }
});

module.exports = router;
