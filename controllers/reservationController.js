const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Reservation = require('../models/reservation');


/**
 * @desc    Get all reservations
 * @route   GET /reservations
 * @access  Public
 */
exports.getAllReservations = asyncHandler(
    async (req, res, next) => {
        const reservation = await Reservation.find();

        res.status(200).json({
            status: 'success',
            results: reservation.length,
            data: reservation
        });
    }
);


/**
 * @desc    Get single reservation
 * @route   GET /reservations/:id
 * @access  Public
 */
exports.getSingleReservation = asyncHandler(
    async (req, res, next) => {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return next(new ApiError(`Reservation not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            data: reservation
        });
    }
);


/**
 * @desc    Create a reservation
 * @route   POST /reservations
 * @access  Private
 */
exports.createReservation = asyncHandler(
    async (req, res, next) => {
        const reservation = await Reservation.create(req.body);

        res.status(201).json({
            status: 'success',
            data: reservation
        });
    }
);


/**
 * @desc    Update a reservation
 * @route   PUT /reservations/:id
 * @access  Private
 */
exports.updateReservation = asyncHandler(
    async (req, res, next) => {
        const id = req.params.id;
        const reservation = await Reservation.findByIdAndUpdate(
            id,
            req.body,
            {new: true, runValidators: true}
        );

        if (!reservation) {
            return next(new ApiError(`Reservation not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            data: reservation
        });
    }
);


/**
 * @desc    Delete a reservation
 * @route   DELETE /reservations/:id
 * @access  Private
 */
exports.deleteReservation = asyncHandler(
    async (req, res, next) => {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);

        if (!reservation) {
            return next(new ApiError(`Reservation not found with id of ${req.params.id}`, 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    }
);