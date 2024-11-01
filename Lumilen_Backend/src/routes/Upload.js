const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "DataPicture",
        allowedFormats: ["jpg", "png", "jpeg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    }
});

const upload = multer({ storage: storage });

// Route upload ảnh
router.post("/", upload.fields([{ name: "img", maxCount: 1 }]), (req, res) => {
    console.log("Files uploaded:", req.files);
    if (req.files && req.files["img"]) {
        const link_img = req.files["img"][0];
        res.send(link_img);
    } else {
        res.status(400).send("No files uploaded.");
    }
});

module.exports = router;
