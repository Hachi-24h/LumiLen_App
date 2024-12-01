const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    mess: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        
    },
    picture: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
