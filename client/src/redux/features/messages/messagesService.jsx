import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//========================{Transaction Routes}=====================================

const allMessages = async (chatId) => {
  const response = await axios.get(`${BACKEND_URL}/message/${chatId}`);
  if (response.data) {
    return response.data;
  }
};

const sendMessage = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/message`, userData);
  if (response.data) {
    return response.data;
  }
};

const getUserMessagesById = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/message/getUserMessagesById`
  );
  if (response.data) {
    return response.data;
  }
};

const messagesService = {
  allMessages,
  sendMessage,
  getUserMessagesById,
};

export default messagesService;
