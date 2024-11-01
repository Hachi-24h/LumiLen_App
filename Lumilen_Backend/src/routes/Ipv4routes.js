// src/routes/IpRoutes.js
const express = require("express");
const router = express.Router();
const getLocalIpAddress = require("../config/getLocalIpv4");

router.get("/get-ipv4", (req, res) => {
    const ipv4 = getLocalIpAddress();
    res.json({ ipv4 });
});

module.exports = router;
