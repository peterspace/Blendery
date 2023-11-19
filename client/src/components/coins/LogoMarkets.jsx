import { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from './Skeleton';
import LogoUpload from './LogoUpload';



// export const handleFileUpload1 = async (uploadFile, symbol) => {
//   const formData = new FormData();
//   formData.append('file', uploadFile);
//   formData.append('public_id', symbol); // created new uplaod
//   formData.append('upload_preset', 'kxxtmdn1'); // created new uplaod

//   try {
//     const response = await axios.post(
//       'https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/',
//       formData
//     );
//     return response.data.secure_url;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const handleFileUpload = async (uploadFile, symbol) => {
  const formData = new FormData();
  formData.append('file', uploadFile);
  formData.append('public_id', symbol); // created new uplaod
  // formData.append('upload_preset', 'blendery'); // created new uplaod
  formData.append('upload_preset', 'kxxtmdn1'); // created new uplaod

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


const LogoMarkets = () => {
 
  const response = localStorage.getItem('tokensData')
    ? JSON.parse(localStorage.getItem('tokensData'))
    : null;

  const [token, setTToken] = useState('');
  const [profileImage, setProfileImage] = useState('');

  console.log({ profileImage: profileImage });
  const [tokenUri, setTokenUri] = useState('');
  console.log({ tokenUri: tokenUri });


  //====={Upload to cloudinary}===================================
  // async function uplaodToCloudinary() {
  //   const uri =
  //     token?.image && (await handleFileUpload(token?.image, token?.symbol));
  //   setTokenUri(uri);
  // }

  // useEffect(() => {
  //   if (token) {
  //     setTimeout(() => {
  //       uplaodToCloudinary();
  //     }, 2000);
  //   }
  // }, [token]);

    //====={Upload to cloudinary}===================================
    
  // async function getToken() {
  //   const userData = {
  //     id: token?.id,
  //     symbol: token?.symbol,
  //     name: token?.name,
  //     image: token?.image, // update with cloudinary image before sending to backend
  //     current_price: token?.current_price,
  //     market_cap: token?.market_cap,
  //     market_cap_rank: token?.market_cap_rank,
  //     fully_diluted_valuation: token?.fully_diluted_valuation,
  //     total_volume: token?.total_volume,
  //     high_24h: token?.high_24h,
  //     low_24h: token?.low_24h,
  //     price_change_24h: token?.price_change_24h,
  //     price_change_percentage_24h: token?.price_change_percentage_24h,
  //     market_cap_change_24h: token?.market_cap_change_24h,
  //     market_cap_change_percentage_24h: token?.market_cap_change_percentage_24h,
  //     circulating_supply: token?.circulating_supply,
  //     total_supply: token?.total_supply,
  //     max_supply: token?.max_supply,
  //     ath: token?.ath,
  //     ath_change_percentage: token?.ath_change_percentage,
  //     ath_date: token?.ath_date,
  //     atl: token?.atl,
  //     atl_change_percentage: token?.atl_change_percentage,
  //     atl_date: token?.atl_date,
  //     roi: token?.roi,
  //     last_updated: token?.last_updated,
  //   };

  //   try {
  //     const res = await apiRequest({
  //       url: '/tokens',
  //       // token: user?.token,
  //       data: userData,
  //       method: 'POST',
  //     });

  //     console.log({ res: res });

  //     if (res.status === 'failed') {
  //       setErrMsg(res.message);
  //     } else {
  //       setErrMsg(res.message);
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // }

  if (!response) {
    return (
      <div className="wrapper-container mt-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    );
  }

  return (
    <section className="mt-8">
      <h1 className="text-2xl mb-2">Markets</h1>
      {response &&
        response.map((coin) => (
          <LogoUpload key={coin.id} coin={coin} setTCoin={setTToken} />
        ))}
    </section>
  );
};

export default LogoMarkets;
