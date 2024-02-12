const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required'],
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Receiver is required'],
    },
    body: {
        type: String,
        required: true
    },
},{
    timestamps: true,
    versionKey: false
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;