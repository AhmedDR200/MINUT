const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    phone: {
        type: String,
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
    },
    role: {
        type: String,
        enum: ['guest', 'admin'],
        default: 'guest'
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    active: {
        type: Boolean,
        default: true,
    }
},{
    versionKey: false,
    timestamps: true
});

// Hashing Password => Mongoose Schema
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;