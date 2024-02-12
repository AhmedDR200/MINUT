const express = require('express');
const router = express.Router();
const messages = require('../controllers/messageController');
const messageValidetors = require('../utils/validetors/messageValidetor');
const { protect } = require("../controllers/authController");


router.route('/')
.post(
 protect,
 messageValidetors.sendMessageValidetor,
 messages.sendMessage
)
.get(
 protect,
 messageValidetors.getMessageValidetor,
 messages.getAllMessages
);

router.route('/:id')
.delete(
 protect,
 messageValidetors.deleteMessageValidetor,
 messages.deleteMessage
)
.patch(
 protect,
 messageValidetors.updateMessageValidetor,
 messages.updateMessage
)
.get(
 protect,
 messageValidetors.getMessageValidetor,
 messages.getMessage
);



module.exports = router;