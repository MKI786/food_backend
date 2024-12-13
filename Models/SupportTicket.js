const mongoose  = require('mongoose')

const SupportTicketCollection = new mongoose.Schema({
    raisedBy: ObjectId, // References Supplier._id or Customer._id
    role: String, // 'Supplier', 'Customer'
    subject: String, // Ticket subject
    description: String, // Detailed issue description
    status: String, // 'Open', 'In Progress', 'Resolved'
    resolvedBy: ObjectId, // References Admin._id
    resolutionComments: String, // Comments or details of the resolution
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('SupportTicket_a', SupportTicketCollection);