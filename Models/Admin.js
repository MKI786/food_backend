const mongoose  = require('mongoose')

const AdminCollection = new mongoose.Schema({
    name:  {type: String , required: true}, // Admin's full name
    email: {type: String , required: true, unique: true}, // Unique email for the admin
    password: {type: String , required: true}, // Hashed password
    role: {type: String , required: true}, // 'customer admin', 'supplier Admin'
    phone: {type: String , required: true}, // Contact number
    profilepicture: {type: String}, // URL for admin's profile picture (optional)
    token:{type: String},
    createdAt: {type: Date },
    updatedAt: {type: Date },
});

module.exports = mongoose.model('Admin_a', AdminCollection);