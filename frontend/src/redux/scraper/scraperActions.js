import { POST_REQUEST, POST_SUCCESS, POST_FAILURE } from './actionTypes';

import axios from 'axios';

export default function scraper(username, password) {
  const token = localStorage.getItem('token');
  const postRequest = () => {
    return {
      type: POST_REQUEST,
    };
  };

  const postSuccess = (data) => {
    return {
      type: POST_SUCCESS,
      payload: data,
    };
  };

  const postError = (error) => {
    return {
      type: POST_FAILURE,
      payload: error,
    };
  };

  return (dispatch) => {
    dispatch(postRequest());
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/scraper',
      data: {
        username: username,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        dispatch(postSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(postError(errorMessage));
      });
  };
}
