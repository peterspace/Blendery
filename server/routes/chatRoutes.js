const express = require('express');
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  createTIcketChat,
  createGroupChatByTransaction,
} = require('../controllers/chatControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/groupremove').put(protect, removeFromGroup);
router.route('/groupadd').put(protect, addToGroup);
router.route('/createTicketChat').post(protect, createTIcketChat);
router.route('/createGroupChatByTransaction').post(createGroupChatByTransaction);

module.exports = router;
