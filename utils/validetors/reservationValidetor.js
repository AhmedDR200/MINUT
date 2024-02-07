const { check, body } = require('express-validator');
const validetorMiddleware = require('../../middlewares/validetorMiddleware');


const createReservationValidetor = [
    check('property')
    .notEmpty()
    .withMessage('Property ID is required')
    .isNumeric()
    .withMessage('Property ID must be a number')
    .isMongoId()
    .withMessage('Property ID must be a valid MongoDB ID'),

    check('guest')
    .notEmpty()
    .withMessage('Guest ID is required')
    .isNumeric()
    .withMessage('Guest ID must be a number')
    .isMongoId()
    .withMessage('Guest ID must be a valid MongoDB ID'),

    check('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isDate()
    .withMessage('Start date must be a date'),

    check('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isDate()
    .withMessage('End date must be a date'),

    validetorMiddleware
];


const updateReservationValidetor = [
    body('property')
    .optional()
    .isNumeric()
    .withMessage('Property ID must be a number')
    .isMongoId()
    .withMessage('Property ID must be a valid MongoDB ID'),

    body('guest')
    .optional()
    .isNumeric()
    .withMessage('Guest ID must be a number')
    .isMongoId()
    .withMessage('Guest ID must be a valid MongoDB ID'),

    body('startDate')
    .optional()
    .isDate()
    .withMessage('Start date must be a date'),

    body('endDate')
    .optional()
    .isDate()
    .withMessage('End date must be a date'),

    validetorMiddleware
];


const deleteReservationValidetor = [
    check('id')
    .notEmpty()
    .withMessage('Id is required')
    .isMongoId()
    .withMessage('Id must be a valid MongoDB ID'),

    validetorMiddleware
];


const getReservationValidetor = [
    check('id')
    .notEmpty()
    .withMessage('Id is required')
    .isMongoId()
    .withMessage('Id must be a valid MongoDB ID'),

    validetorMiddleware
];


module.exports = {
    createReservationValidetor,
    updateReservationValidetor,
    deleteReservationValidetor,
    getReservationValidetor
}