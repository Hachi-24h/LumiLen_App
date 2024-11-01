const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/UserRoutes');
const upLoadRoutes = require('./src/routes/Upload');
require('dotenv').config();
const getLocalIpAddress = require("./src/config/getLocalIpv4");
const ipRoutes = require("./src/routes/Ipv4routes");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const app = express();

// Kết nối MongoDB
connectDB();

// Middleware
app.use(express.json());

// Route gốc
app.get('/', (req, res) => {
    res.send('Welcome to the API server!');
});


app.use("/ip", ipRoutes);
app.use('/user', userRoutes);
app.use('/upload', upLoadRoutes);

// Lắng nghe trên cổng
const PORT = process.env.PORT || 3000;
const IPV4 = getLocalIpAddress() ;

app.listen(PORT, () => {
    console.log(`Server is running on http://${IPV4}:${PORT}`);
});

