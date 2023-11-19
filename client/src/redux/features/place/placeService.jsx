import axios from 'axios';
import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//========================{Transaction Routes}=====================================

const createCountry = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/place/createCountry`,
    userData
  );
  if (response.data?._id) {
    toast.success('country added Successful...');
    return response.data;
  }
};

const getAllCountries = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/place/getAllCountries`);
  if (response.data?._id) {
    // toast.success('update Successful...');
    return response.data;
  }
};

const getAllStatesByCountry = async (userData) => {
  const response = await axios.get(
    `${BACKEND_URL}/api/place/getAllStatesByCountry`,
    userData
  );
  if (response.data?._id) {
    // toast.success('update Successful...');
    return response.data;
  }
};

const placeService = {
  createCountry,
  getAllCountries,
  getAllStatesByCountry,
};

export default placeService;
