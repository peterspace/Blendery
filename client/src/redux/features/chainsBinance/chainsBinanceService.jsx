import axios from 'axios';
import { base_url } from '../../utils/baseUrl';

const postQuery = async (contactData) => {
  const response = await axios.post(`${base_url}enquiry`, contactData);

  return response.data;
};

const contactService = {
  postQuery,
};

export default contactService;
