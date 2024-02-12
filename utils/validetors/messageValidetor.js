const { check, body, param } = require('express-validator');
const validetorMiddleware = require('../../middlewares/validetorMiddleware');


exports.sendMessageValidetor = [
    body('receiverId').isMongoId().withMessage('Invalid receiver ID'),
    body('body').isString().withMessage('Message body is required'),
    validetorMiddleware
];

exports.deleteMessageValidetor = [
    param('id').isMongoId().withMessage('Invalid message ID'),
    validetorMiddleware
];

exports.updateMessageValidetor = [
    param('id').isMongoId().withMessage('Invalid message ID'),
    body('body').isString().withMessage('Message body is required'),
    validetorMiddleware
];

exports.getMessageValidetor = [
    param('id').isMongoId().withMessage('Invalid message ID'),
    validetorMiddleware
];