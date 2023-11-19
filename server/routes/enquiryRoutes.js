const express = require('express');
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
  supportTicket,
  contactAutoReply,
} = require('../controllers/enquiryController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/autoreply', contactAutoReply);

router.post('/', createEnquiry);
router.put('/:id', protect, isAdmin, updateEnquiry);
router.delete('/:id', protect, isAdmin, deleteEnquiry);
router.get('/:id', getEnquiry);
router.get('/', getallEnquiry);

module.exports = router;

