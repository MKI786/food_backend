const mongoose  = require('mongoose')

const CustomerCollection = new mongoose.Schema({

    customerId: ObjectId, // References Customer._id
    action: String, // 'Deactivate Customer', 'Resolve Complaint'
    adminId: ObjectId, // References Admin._id
    status: String, // 'Active', 'Deactivated'
    comments: String, // Additional remarks or reasons for actions
    timestamp: Date

});

module.exports = mongoose.model('Customer_a', CustomerCollection);