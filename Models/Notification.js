const mongoose  = require('mongoose')

const NotificationCollection = new mongoose.Schema({

    recipientType: String, // 'Supplier', 'Customer', 'All'
    recipientId: ObjectId, // References Supplier._id or Customer._id (nullable for 'All')
    title: String, // Notification title
    message: String, // Notification content
    createdAt: Date,
    isRead: Boolean // Status of the notification

});

module.exports = mongoose.model('Notification_a', NotificationCollection);