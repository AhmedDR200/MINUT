const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password required"],
        minlength: [6, "Too short password"]
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    }
},{
    versionKey: false,
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;