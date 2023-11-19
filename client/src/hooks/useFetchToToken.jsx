import { useEffect, useState } from 'react';
// const url = 'https://api.coingecko.com/api/v3';
const url = 'https://api.coingecko.com/api/v3/';
const useFetchToToken = (param) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';
  // const url = 'https://api.coingecko.com/api/v3';

  const fetchData = async (param) => {
    try {
      const response = await fetch(url + param, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const updatedResponse = await response.json();
      setResponse(updatedResponse);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(param);
  }, []);

  return {
    response,
    loading,
    error,
  };
};

// ========{from query to function}==============
// setPost: (state, action) => {
//   const updatedPosts = state.posts.map((post) => {
//     if (post._id === action.payload.post._id) return action.payload.post;
//     return post;
//   });
//   state.posts = updatedPosts;
// }

const setPost = async (state, action) => {
  const updatedPosts = state.posts.map((post) => {
    if (post._id === action.payload.post._id) return action.payload.post;
    return post;
  });
  state.posts = updatedPosts;
};

export default useFetchToToken;
