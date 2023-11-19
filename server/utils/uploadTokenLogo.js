const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRECT,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: 'auto',
  folder: 'tokens',
};

// formData.append('public_id', symbol); // created new uplaod
// formData.append('upload_preset', 'blendery'); // created new uplaod

// single image upload
module.exports.uploadTokenLogo = (image, symbol) => {
  
  // newImage = {...image, "public_id": symbol, 'upload_preset': 'blendery' }
  newImage = {...image, "public_id": symbol, 'upload_preset': 'kxxtmdn1' }
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(newImage, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return { message: error.message };
    });
  });
};

