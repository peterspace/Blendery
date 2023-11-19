import axios from 'axios';
import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const accessChat = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/chat`, userData);
  if (response.data) {
    toast.success('message sent');
    return response.data;
  }
};
const fetchChats = async () => {
  const response = await axios.get(`${BACKEND_URL}/chat`);
  if (response.data) {
    toast.success('message sent');
    return response.data;
  }
};
const createGroupChat = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/chat/group`, userData);
  if (response.data) {
    toast.success('message sent');
    return response.data;
  }
};
const renameGroup = async (userData) => {
  const response = await axios.put(`${BACKEND_URL}/chat/rename`, userData);
  if (response.data) {
    toast.success('message sent');
    return response.data;
  }
};
const removeFromGroup = async (userData) => {
  const response = await axios.put(`${BACKEND_URL}/chat/groupremove`, userData);
  if (response.data) {
    toast.success('message sent');
    return response.data;
  }
};
const addToGroup = async (userData) => {
  const response = await axios.put(`${BACKEND_URL}/chat/groupadd`, userData);
  if (response.data) {
    toast.success('message sent');
    return response.data;
  }
};
const createTIcketChat = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/chat/createTicketChat`, userData);
  if (response.data) {
    toast.success('message sent');
    return response.data;
  }
};
const createGroupChatByTransaction = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/chat/createGroupChatByTransaction`, userData);
  if (response.data) {
    toast.success('message sent');
    return response.data;
  }
};


const chatService = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  createTIcketChat,
  createGroupChatByTransaction,
};

export default chatService;
