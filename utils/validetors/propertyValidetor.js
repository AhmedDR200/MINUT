const { check, body } = require('express-validator');
const validetorMiddleware = require('../../middlewares/validetorMiddleware');


const createPropertyValidetor = [
    check('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

    check('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Description must be between 10 and 200 characters'),

    check('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number'),

    check('location')
    .notEmpty()
    .withMessage('Location is required')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Location must be between 3 and 50 characters'),

    validetorMiddleware
];


const updatePropertyValidetor = [
    body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

    body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Description must be between 10 and 200 characters'),

    body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number'),

    body('location')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Location must be between 3 and 50 characters'),

    validetorMiddleware
];


const deletePropertyValidetor = [
    check('id')
    .notEmpty()
    .withMessage('Id is required')
    .isMongoId()
    .withMessage('Invalid id'),

    validetorMiddleware
];


const getPropertyValidetor = [
    check('id')
    .notEmpty()
    .withMessage('Id is required')
    .isMongoId()
    .withMessage('Invalid id'),

    validetorMiddleware
];


module.exports = {
    createPropertyValidetor,
    updatePropertyValidetor,
    deletePropertyValidetor,
    getPropertyValidetor
};