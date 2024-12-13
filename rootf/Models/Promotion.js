const mongoose  = require('mongoose')

const PromotionCollection = new mongoose.Schema({

    promotionId: ObjectId, // References Promotion._id
    supplierId: ObjectId, // References Supplier._id
    action: String, // 'Approve Promotion', 'Reject Promotion'
    adminId: ObjectId, // References Admin._id
    status: String, // 'Approved', 'Rejected', 'Pending'
    comments: String, // Reasons for rejection or other notes
    timestamp: Date
    
});

module.exports = mongoose.model('Promotion_a', PromotionCollection);


