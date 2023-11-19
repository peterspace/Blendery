const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Submitted', // 'Submitted', 'Contacted', 'In Progress', 'Resolved'
      // enum: ['Submitted', 'Contacted', 'In Progress', 'Resolved'],
    },
  },
  {
    timestamps: true,
  }
);
const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;
