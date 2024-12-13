const mongoose  = require('mongoose')

const SupplierCollection = new mongoose.Schema({

    supplierId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }, 
    action: {type: String , required: true}, // 'Approve Supplier', 'Deactivate Supplier', 'Verify Business'
    adminId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },  // References Admin._id
    status: {type: String , required: true}, // 'Approved', 'Rejected', 'Pending', 'Deactivated'
    comments: {type: String}, // Additional remarks or reasons for actions
    timestamp: Date

});

module.exports = mongoose.model('Supplier_a', SupplierCollection);


