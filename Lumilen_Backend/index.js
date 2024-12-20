
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/User/UserRoutes');
const upLoadRoutes = require('./src/routes/Picturess/Upload');
require('dotenv').config();
const getLocalIpAddress = require("./src/config/getLocalIpv4");
const ipRoutes = require("./src/routes/IP/Ipv4routes");
const { picture } = require('./src/config/cloudinary');
const pictureRoute = require('./src/routes/Picturess/pictureRoute');
const tableUserRoute = require('./src/routes/TableUser/tableUserRoute');
const NotifiRoute = require('./src/routes/Notification/NotifiRoutes');
const DataSearch = require('./src/routes/DataSearch/dataSearchRoutes');

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


const PORT = process.env.PORT || 3000;
const IPV4 = getLocalIpAddress() ;

app.use("/ip", ipRoutes);
app.use('/user', userRoutes);
app.use('/upload', upLoadRoutes);
app.use('/picture',pictureRoute);
app.use('/tableUser',tableUserRoute);
app.use('/notification',NotifiRoute);
app.use('/data',DataSearch)

app.post('/api/search_image', async (req, res) => {
    try {
        const response = await axios.post(`http://${IPV4}:5001/api/search_image`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Flask API:', error);
        res.status(500).json({ error: 'Failed to process image search request' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://${IPV4}:${PORT}`);
});
