const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Property = require('../models/property');


/**
 * @desc    Get all properties
 * @route   GET /properties
 * @access  Public
 */
exports.getAllProperties = asyncHandler(
    async (req, res, next) => {
        const property = await Property.find();

        res.status(200).json({
            status: 'success',
            results: property.length,
            data: property
        });
    }
);


/**
 * @desc    Get single property
 * @route   GET /properties/:id
 * @access  Public
 */
exports.getSingleProperty = asyncHandler(
    async (req, res, next) => {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return next(new ApiError(`Property not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            data: property
        });
    }
);


/**
 * @desc    Create a property
 * @route   POST /properties
 * @access  Private
 */
exports.createProperty = asyncHandler(
    async (req, res, next) => {
        const property = await Property.create(req.body);

        res.status(201).json({
            status: 'success',
            data: property
        });
    }
);


/**
 * @desc    Update a property
 * @route   PUT /properties/:id
 * @access  Private
 */
exports.updateProperty = asyncHandler(
    async (req, res, next) => {
        const id = req.params.id;
        const property = await Property.findByIdAndUpdate(
            id,
            req.body,
            {new: true, runValidators: true}
        );

        if (!property) {
            return next(new ApiError(`Property not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            data: property
        });
    }
);


/**
 * @desc    Delete a property
 * @route   DELETE /properties/:id
 * @access  Private
 */
exports.deleteProperty = asyncHandler(
    async (req, res, next) => {
        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return next(new ApiError(`Property not found with id of ${req.params.id}`, 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    }
);