const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/user');


/**
 * @desc    Get all users
 * @route   GET /users
 * @access  Private/ Admin
 */
exports.getAllUsers = asyncHandler(
    async (req, res, next) => {
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users
        });
    }
);


/**
 * @desc    Get single user
 * @route   GET /users/:id
 * @access  Private/ Admin
 */
exports.getSingleUser = asyncHandler(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ApiError(`User not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    }
);


/**
 * @desc    Create a user
 * @route   POST /users
 * @access  Private/ Admin
 */
exports.createUser = asyncHandler(
    async (req, res, next) => {
        const user = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: user
        });
    }
);


/**
 * @desc    Update a user
 * @route   PUT /users/:id
 * @access  Private/ Admin
 */
exports.updateUser = asyncHandler(
    async (req, res, next) => {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return next(new ApiError(`User not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    }
);


/**
 * @desc    Delete a user
 * @route   DELETE /users/:id
 * @access  Private/ Admin
 */
exports.deleteUser = asyncHandler(
    async (req, res, next) => {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return next(new ApiError(`User not found with id of ${req.params.id}`, 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    }
);