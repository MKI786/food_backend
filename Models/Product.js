const mongoose  = require('mongoose')

const ProductCollection = new mongoose.Schema({

    productId: ObjectId, // References Product._id
    supplierId: ObjectId, // References Supplier._id
    action: String, // 'Remove Product', 'Edit Product Details'
    adminId: ObjectId, // References Admin._id
    comments: String, // Reasons for removal or action details
    timestamp: Date
});

module.exports = mongoose.model('Product_a', ProductCollection);