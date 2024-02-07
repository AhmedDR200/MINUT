const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');


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
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role
            },
            { new: true, runValidators: true });

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
 * @desc    Update a user password
 * @route   PUT /users/changePassword/:id
 * @access  Private/ Admin
 */
exports.changePassword = asyncHandler(
    async(req, res, next) => {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                password: await bcrypt.hash(req.body.password, 12),
                passwordChangedAt: Date.now(),
            },
            { new: true }
        );

        if(!user){
            return next(new ApiError(`User not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            message: 'Password updated successfully',
            data: user
        });
    }
);


/**
 * @desc    Update logged user password
 * @route   PUT /users/updateMyPassword
 * @access  Private/ Logged User
 */
exports.updateLoggedUserPassword = asyncHandler(
    async(req, res, next) => {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                password: await bcrypt.hash(req.body.password, 12),
                passwordChangedAt: Date.now(),
            },
            { new: true }
        );

        // generate new token
        const token = createToken(user._id);

        res.status(200).json({
            status: 'success',
            data: user,
            token: token
        });
    }
);


/**
 * @desc    Update logged user data without password and role
 * @route   PATCH /users/updateMyData
 * @access  Private/ Logged User
 */
exports.updateLoggedUserData = asyncHandler(
    async(req, res, next) => {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            },
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            data: updatedUser,
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


/**
 * @desc    Deactivate logged user
 * @route   DELETE /users/deactivateMe
 * @access  Private/ Logged User
 */
exports.deactivateLoggedUser = asyncHandler(
    async(req, res, next) => {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                active: false
            }
        );

        res.status(200).json({
            status: 'success',
            message: 'User Deactivated Successfully'
        });
    }
);


/**
 * @desc Fetch logged user data
 * @route   GET /users/getMe
 * @access  Private/ Logged User
 */
exports.getLoggedUserData = asyncHandler(
    async(req, res, next) => {
      req.params.id = req.user._id;
      next();
    }
);