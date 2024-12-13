const mongoose  = require('mongoose')

const ReportCollection = new mongoose.Schema({

    reportType: String, // 'Sales Report', 'Customer Activity', 'Supplier Performance'
    filters: Object, // Criteria used to generate the report (e.g., date range, category)
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin_a' }, // References Admin._id
    reportData: Object, // JSON or structure containing the report details
    createdAt: Date
});

module.exports = mongoose.model('Report_a', ReportCollection);