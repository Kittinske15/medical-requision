let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: String,
    password: String,
    first_name: String,
    last_name: String,
    expense: Number,
    requision_date: String,
    requision_type: String,
    requision_for: String
});

module.exports = mongoose.model('User', userSchema, 'medical_requistion');