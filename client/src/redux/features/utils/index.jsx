import axios from 'axios';

// const API_URL = "http://localhost:8800/api-v1";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const API = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || 'GET',
      data: data,
      headers: {
        'content-type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return { status: err.success, message: err.message };
  }
};


//===={Me}=======
export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append('file', uploadFile);
  formData.append('upload_preset', 'kxxtmdn1');

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/',
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

// image.append('file', profileImage);
//         image.append('cloud_name', 'datkh2oxv');
//         image.append('upload_preset', 'kxxtmdn1');

//         // First save image to cloudinary
//         const response = await fetch(
//           'https://api.cloudinary.com/v1_1/datkh2oxv/image/upload',
//           { method: 'post', body: image }
//         );

export const updateURL = ({
  pageNum,
  query,
  cmpLoc,
  sort,
  navigate,
  location,
  jType,
  exp,
}) => {
  const params = new URLSearchParams();

  if (pageNum && pageNum > 1) {
    params.set('page', pageNum);
  }

  if (query) {
    params.set('search', query);
  }

  if (cmpLoc) {
    params.set('location', cmpLoc);
  }

  if (sort) {
    params.set('sort', sort);
  }

  if (jType) {
    params.set('jtype', jType);
  }

  if (exp) {
    params.set('exp', exp);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });

  return newURL;
};
