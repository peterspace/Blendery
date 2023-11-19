const express = require('express');
const {
  allMessages,
  sendMessage,
  getUserMessagesById,
} = require('../controllers/messageControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:chatId').get(protect, allMessages);
router.route('/').post(protect, sendMessage);
router.route('/getUserMessagesById').get(protect, getUserMessagesById);

module.exports = router;
