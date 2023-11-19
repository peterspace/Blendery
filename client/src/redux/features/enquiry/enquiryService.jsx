import axios from 'axios';
import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const createEnquiry = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/contactus`, userData);
  if (response.data) {
    toast.success('message sent');
    return response.data;
  }
};

const contactAutoReply = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/enquiry/autoreply`,
    userData
  );

  if (response.data) {
    toast.success('reply sent');
  }
  return response.data;
};

const getEnquiries = async () => {
  const response = await axios.get(`${BACKEND_URL}/enquiry`);

  return response.data;
};
const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${BACKEND_URL}/enquiry/${id}`);
  return response.data;
};
const getEnquiry = async (id) => {
  const response = await axios.get(`${BACKEND_URL}/enquiry/${id}`);
  return response.data;
};
const udpateEnquiry = async (userData) => {
  const response = await axios.put(
    `${BACKEND_URL}/enquiry/${userData.id}`,
    userData
  );
  return response.data;
};

const enquiryService = {
  createEnquiry,
  contactAutoReply,
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  udpateEnquiry,
};

export default enquiryService;
