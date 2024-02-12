const express = require('express');
const router = express.Router();
const messages = require('../controllers/messageController');
const { protect, allowedTo } = require("../controllers/authController");


router.route('/')
.post(
 protect,
 messages.sendMessage
)
.get(
 protect,
 messages.getAllMessages
);

router.route('/:id')
.delete(
 protect,
 messages.deleteMessage
)
.patch(
 protect,
 messages.updateMessage
)
.get(
 protect,
 messages.getMessage
);



module.exports = router;