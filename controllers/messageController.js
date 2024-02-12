const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Message = require('../models/message');


/**
 * @desc    Logeed User make a message
 * @route   POST /messages
 * @access  Private/ Logged User
*/
exports.sendMessage = asyncHandler(
    async(req, res, next) => {
        const senderId = req.user._id
        const { receiverId, body } = req.body;

        const message = await Message.create({
            sender: senderId,
            receiver: receiverId,
            body
        });

        if(!message){
            return next(new ApiError("Message failed", 400))
        }

        res.status(201).json({
            status: 'success',
            data: message
        });
    }
);


/**
 * @desc    Delete a message
 * @route   DELETE /messages/:id
 * @access  Private/ Logged User
*/
exports.deleteMessage = asyncHandler(
    async(req, res, next) => {
        const message = await Message.findById(req.params.id);

        if(!message){
            return next(new ApiError("Message not found", 404))
        }

        // Check if the user is the sender of the message
        if(message.sender.toString() !== req.user._id.toString()){
            return next(new ApiError("You are not allowed to delete this message", 403))
        }

        // Use the deleteOne method on the Message model
        await Message.deleteOne({ _id: req.params.id });

        res.status(200).json({
            status: 'success',
            data: {}
        });
    }
);


/**
 * @desc    Update a message
 * @route   PATCH /messages/:id
 * @access  Private/ Logged User
 * @note    This is not a full update, only the body of the message
*/
exports.updateMessage = asyncHandler(
    async(req, res, next) => {
        const message = await Message.findById(req.params.id);

        if(!message){
            return next(new ApiError("Message not found", 404))
        }

        // Check if the user is the sender of the message
        if(message.sender.toString() !== req.user._id.toString()){
            return next(new ApiError("You are not allowed to update this message", 403))
        }

        // Update the message
        message.body = req.body.body;
        await message.save();

        res.status(200).json({
            status: 'success',
            data: message
        });
    }
);


/**
 * @desc    Get all messages
 * @route   GET /messages
 * @access  Private/ Logged User
 * @note    This will return all messages of the logged user
*/
exports.getAllMessages = asyncHandler(
    async(req, res, next) => {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id },
                { receiver: req.user._id }
            ]
        });

        res.status(200).json({
            status: 'success',
            data: messages
        });
    }
);


/**
 * @desc    Get a message
 * @route   GET /messages/:id
 * @access  Private/ Logged User
 * @note    This will return a message by its id
*/
exports.getMessage = asyncHandler(
    async(req, res, next) => {
        const message = await Message.findById(req.params.id);

        if(!message){
            return next(new ApiError("Message not found", 404))
        }

        // Check if the user is the sender or the receiver of the message
        if(message.sender.toString() !== req.user._id.toString() && message.receiver.toString() !== req.user._id.toString()){
            return next(new ApiError("You are not allowed to get this message", 403))
        }

        res.status(200).json({
            status: 'success',
            data: message
        });
    }
);